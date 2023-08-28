"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterAdapterWithHeartbeat = exports.ClusterAdapter = exports.MessageType = void 0;
const socket_io_adapter_1 = require("socket.io-adapter");
const debug_1 = require("debug");
const util_1 = require("./util");
const debug = (0, debug_1.default)("socket.io-adapter");
const EMITTER_UID = "emitter";
const DEFAULT_TIMEOUT = 5000;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["INITIAL_HEARTBEAT"] = 1] = "INITIAL_HEARTBEAT";
    MessageType[MessageType["HEARTBEAT"] = 2] = "HEARTBEAT";
    MessageType[MessageType["BROADCAST"] = 3] = "BROADCAST";
    MessageType[MessageType["SOCKETS_JOIN"] = 4] = "SOCKETS_JOIN";
    MessageType[MessageType["SOCKETS_LEAVE"] = 5] = "SOCKETS_LEAVE";
    MessageType[MessageType["DISCONNECT_SOCKETS"] = 6] = "DISCONNECT_SOCKETS";
    MessageType[MessageType["FETCH_SOCKETS"] = 7] = "FETCH_SOCKETS";
    MessageType[MessageType["FETCH_SOCKETS_RESPONSE"] = 8] = "FETCH_SOCKETS_RESPONSE";
    MessageType[MessageType["SERVER_SIDE_EMIT"] = 9] = "SERVER_SIDE_EMIT";
    MessageType[MessageType["SERVER_SIDE_EMIT_RESPONSE"] = 10] = "SERVER_SIDE_EMIT_RESPONSE";
    MessageType[MessageType["BROADCAST_CLIENT_COUNT"] = 11] = "BROADCAST_CLIENT_COUNT";
    MessageType[MessageType["BROADCAST_ACK"] = 12] = "BROADCAST_ACK";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function encodeOptions(opts) {
    return {
        rooms: [...opts.rooms],
        except: [...opts.except],
        flags: opts.flags,
    };
}
function decodeOptions(opts) {
    return {
        rooms: new Set(opts.rooms),
        except: new Set(opts.except),
        flags: opts.flags,
    };
}
/**
 * A cluster-ready adapter. Any extending class must:
 *
 * - implement {@link ClusterAdapter#publishMessage} and {@link ClusterAdapter#publishResponse}
 * - call {@link ClusterAdapter#onMessage} and {@link ClusterAdapter#onResponse}
 */
class ClusterAdapter extends socket_io_adapter_1.Adapter {
    constructor(nsp) {
        super(nsp);
        this.requests = new Map();
        this.ackRequests = new Map();
        this.uid = (0, util_1.randomId)();
    }
    /**
     * Called when receiving a message from another member of the cluster.
     *
     * @param message
     * @param offset
     * @protected
     */
    async onMessage(message, offset) {
        if (message.uid === this.uid) {
            return debug("ignore message from self");
        }
        debug("new event of type %d from %s", message.type, message.uid);
        switch (message.type) {
            case MessageType.BROADCAST: {
                const withAck = message.data.requestId !== undefined;
                if (withAck) {
                    super.broadcastWithAck(message.data.packet, decodeOptions(message.data.opts), (clientCount) => {
                        debug("waiting for %d client acknowledgements", clientCount);
                        this.publishResponse(message.uid, {
                            type: MessageType.BROADCAST_CLIENT_COUNT,
                            data: {
                                requestId: message.data.requestId,
                                clientCount,
                            },
                        });
                    }, (arg) => {
                        debug("received acknowledgement with value %j", arg);
                        this.publishResponse(message.uid, {
                            type: MessageType.BROADCAST_ACK,
                            data: {
                                requestId: message.data.requestId,
                                packet: arg,
                            },
                        });
                    });
                }
                else {
                    const packet = message.data.packet;
                    const opts = decodeOptions(message.data.opts);
                    this.addOffsetIfNecessary(packet, opts, offset);
                    super.broadcast(packet, opts);
                }
                break;
            }
            case MessageType.SOCKETS_JOIN:
                super.addSockets(decodeOptions(message.data.opts), message.data.rooms);
                break;
            case MessageType.SOCKETS_LEAVE:
                super.delSockets(decodeOptions(message.data.opts), message.data.rooms);
                break;
            case MessageType.DISCONNECT_SOCKETS:
                super.disconnectSockets(decodeOptions(message.data.opts), message.data.close);
                break;
            case MessageType.FETCH_SOCKETS: {
                debug("calling fetchSockets with opts %j", message.data.opts);
                const localSockets = await super.fetchSockets(decodeOptions(message.data.opts));
                this.publishResponse(message.uid, {
                    type: MessageType.FETCH_SOCKETS_RESPONSE,
                    data: {
                        requestId: message.data.requestId,
                        sockets: localSockets.map((socket) => {
                            // remove sessionStore from handshake, as it may contain circular references
                            const _a = socket.handshake, { sessionStore } = _a, handshake = __rest(_a, ["sessionStore"]);
                            return {
                                id: socket.id,
                                handshake,
                                rooms: [...socket.rooms],
                                data: socket.data,
                            };
                        }),
                    },
                });
                break;
            }
            case MessageType.SERVER_SIDE_EMIT: {
                const packet = message.data.packet;
                const withAck = message.data.requestId !== undefined;
                if (!withAck) {
                    this.nsp._onServerSideEmit(packet);
                    return;
                }
                let called = false;
                const callback = (arg) => {
                    // only one argument is expected
                    if (called) {
                        return;
                    }
                    called = true;
                    debug("calling acknowledgement with %j", arg);
                    this.publishResponse(message.uid, {
                        type: MessageType.SERVER_SIDE_EMIT_RESPONSE,
                        data: {
                            requestId: message.data.requestId,
                            packet: arg,
                        },
                    });
                };
                packet.push(callback);
                this.nsp._onServerSideEmit(packet);
                break;
            }
            default:
                debug("unknown message type: %s", message.type);
        }
    }
    /**
     * Called when receiving a response from another member of the cluster.
     *
     * @param response
     * @protected
     */
    onResponse(response) {
        var _a, _b;
        const requestId = response.data.requestId;
        debug("received response %s to request %s", response.type, requestId);
        switch (response.type) {
            case MessageType.BROADCAST_CLIENT_COUNT: {
                (_a = this.ackRequests
                    .get(requestId)) === null || _a === void 0 ? void 0 : _a.clientCountCallback(response.data.clientCount);
                break;
            }
            case MessageType.BROADCAST_ACK: {
                (_b = this.ackRequests.get(requestId)) === null || _b === void 0 ? void 0 : _b.ack(response.data.packet);
                break;
            }
            case MessageType.FETCH_SOCKETS_RESPONSE: {
                const request = this.requests.get(requestId);
                if (!request) {
                    return;
                }
                request.current++;
                response.data.sockets.forEach((socket) => request.responses.push(socket));
                if (request.current === request.expected) {
                    clearTimeout(request.timeout);
                    request.resolve(request.responses);
                    this.requests.delete(requestId);
                }
                break;
            }
            case MessageType.SERVER_SIDE_EMIT_RESPONSE: {
                const request = this.requests.get(requestId);
                if (!request) {
                    return;
                }
                request.current++;
                request.responses.push(response.data.packet);
                if (request.current === request.expected) {
                    clearTimeout(request.timeout);
                    request.resolve(null, request.responses);
                    this.requests.delete(requestId);
                }
                break;
            }
            default:
                debug("unknown response type: %s", response.type);
        }
    }
    async broadcast(packet, opts) {
        var _a;
        const onlyLocal = (_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (!onlyLocal) {
            try {
                const offset = await this.publish({
                    type: MessageType.BROADCAST,
                    data: {
                        packet,
                        opts: encodeOptions(opts),
                    },
                });
                this.addOffsetIfNecessary(packet, opts, offset);
            }
            catch (e) {
                return debug("error while broadcasting message: %s", e.message);
            }
        }
        super.broadcast(packet, opts);
    }
    /**
     * Adds an offset at the end of the data array in order to allow the client to receive any missed packets when it
     * reconnects after a temporary disconnection.
     *
     * @param packet
     * @param opts
     * @param offset
     * @private
     */
    addOffsetIfNecessary(packet, opts, offset) {
        var _a;
        if (!this.nsp.server.opts.connectionStateRecovery) {
            return;
        }
        const isEventPacket = packet.type === 2;
        // packets with acknowledgement are not stored because the acknowledgement function cannot be serialized and
        // restored on another server upon reconnection
        const withoutAcknowledgement = packet.id === undefined;
        const notVolatile = ((_a = opts.flags) === null || _a === void 0 ? void 0 : _a.volatile) === undefined;
        if (isEventPacket && withoutAcknowledgement && notVolatile) {
            packet.data.push(offset);
        }
    }
    broadcastWithAck(packet, opts, clientCountCallback, ack) {
        var _a;
        const onlyLocal = (_a = opts === null || opts === void 0 ? void 0 : opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (!onlyLocal) {
            const requestId = (0, util_1.randomId)();
            this.publish({
                type: MessageType.BROADCAST,
                data: {
                    packet,
                    requestId,
                    opts: encodeOptions(opts),
                },
            });
            this.ackRequests.set(requestId, {
                clientCountCallback,
                ack,
            });
            // we have no way to know at this level whether the server has received an acknowledgement from each client, so we
            // will simply clean up the ackRequests map after the given delay
            setTimeout(() => {
                this.ackRequests.delete(requestId);
            }, opts.flags.timeout);
        }
        super.broadcastWithAck(packet, opts, clientCountCallback, ack);
    }
    addSockets(opts, rooms) {
        var _a;
        super.addSockets(opts, rooms);
        const onlyLocal = (_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (onlyLocal) {
            return;
        }
        this.publish({
            type: MessageType.SOCKETS_JOIN,
            data: {
                opts: encodeOptions(opts),
                rooms,
            },
        });
    }
    delSockets(opts, rooms) {
        var _a;
        super.delSockets(opts, rooms);
        const onlyLocal = (_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (onlyLocal) {
            return;
        }
        this.publish({
            type: MessageType.SOCKETS_LEAVE,
            data: {
                opts: encodeOptions(opts),
                rooms,
            },
        });
    }
    disconnectSockets(opts, close) {
        var _a;
        super.disconnectSockets(opts, close);
        const onlyLocal = (_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (onlyLocal) {
            return;
        }
        this.publish({
            type: MessageType.DISCONNECT_SOCKETS,
            data: {
                opts: encodeOptions(opts),
                close,
            },
        });
    }
    async fetchSockets(opts) {
        var _a;
        const [localSockets, serverCount] = await Promise.all([
            super.fetchSockets(opts),
            this.serverCount(),
        ]);
        const expectedResponseCount = serverCount - 1;
        if (((_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local) || expectedResponseCount === 0) {
            return localSockets;
        }
        const requestId = (0, util_1.randomId)();
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                const storedRequest = this.requests.get(requestId);
                if (storedRequest) {
                    reject(new Error(`timeout reached: only ${storedRequest.current} responses received out of ${storedRequest.expected}`));
                    this.requests.delete(requestId);
                }
            }, opts.flags.timeout || DEFAULT_TIMEOUT);
            const storedRequest = {
                type: MessageType.FETCH_SOCKETS,
                resolve,
                timeout,
                current: 0,
                expected: expectedResponseCount,
                responses: localSockets,
            };
            this.requests.set(requestId, storedRequest);
            this.publish({
                type: MessageType.FETCH_SOCKETS,
                data: {
                    opts: encodeOptions(opts),
                    requestId,
                },
            });
        });
    }
    async serverSideEmit(packet) {
        const withAck = typeof packet[packet.length - 1] === "function";
        if (!withAck) {
            return this.publish({
                type: MessageType.SERVER_SIDE_EMIT,
                data: {
                    packet,
                },
            });
        }
        const ack = packet.pop();
        const expectedResponseCount = (await this.serverCount()) - 1;
        debug('waiting for %d responses to "serverSideEmit" request', expectedResponseCount);
        if (expectedResponseCount <= 0) {
            return ack(null, []);
        }
        const requestId = (0, util_1.randomId)();
        const timeout = setTimeout(() => {
            const storedRequest = this.requests.get(requestId);
            if (storedRequest) {
                ack(new Error(`timeout reached: only ${storedRequest.current} responses received out of ${storedRequest.expected}`), storedRequest.responses);
                this.requests.delete(requestId);
            }
        }, DEFAULT_TIMEOUT);
        const storedRequest = {
            type: MessageType.SERVER_SIDE_EMIT,
            resolve: ack,
            timeout,
            current: 0,
            expected: expectedResponseCount,
            responses: [],
        };
        this.requests.set(requestId, storedRequest);
        this.publish({
            type: MessageType.SERVER_SIDE_EMIT,
            data: {
                requestId,
                packet,
            },
        });
    }
    publish(message) {
        return this.publishMessage(Object.assign({ uid: this.uid }, message));
    }
}
exports.ClusterAdapter = ClusterAdapter;
class ClusterAdapterWithHeartbeat extends ClusterAdapter {
    constructor(nsp, opts) {
        super(nsp);
        this.nodesMap = new Map(); // uid => timestamp of last message
        this._opts = Object.assign({
            heartbeatInterval: 5000,
            heartbeatTimeout: 10000,
        }, opts);
    }
    init() {
        this.publish({
            type: MessageType.INITIAL_HEARTBEAT,
        });
    }
    scheduleHeartbeat() {
        if (this.heartbeatTimer) {
            clearTimeout(this.heartbeatTimer);
        }
        this.heartbeatTimer = setTimeout(() => {
            this.publish({
                type: MessageType.HEARTBEAT,
            });
        }, this._opts.heartbeatInterval);
    }
    close() {
        clearTimeout(this.heartbeatTimer);
    }
    onMessage(message, offset) {
        if (message.uid === this.uid) {
            return debug("ignore message from self");
        }
        if (message.uid && message.uid !== EMITTER_UID) {
            // we track the UID of each sender, in order to know how many servers there are in the cluster
            this.nodesMap.set(message.uid, Date.now());
        }
        switch (message.type) {
            case MessageType.INITIAL_HEARTBEAT:
                this.publish({
                    type: MessageType.HEARTBEAT,
                });
                break;
            case MessageType.HEARTBEAT:
                // nothing to do
                break;
            default:
                super.onMessage(message, offset);
        }
    }
    serverCount() {
        const now = Date.now();
        this.nodesMap.forEach((lastSeen, uid) => {
            const nodeSeemsDown = now - lastSeen > this._opts.heartbeatTimeout;
            if (nodeSeemsDown) {
                debug("node %s seems down", uid);
                this.nodesMap.delete(uid);
            }
        });
        return Promise.resolve(1 + this.nodesMap.size);
    }
    publish(message) {
        this.scheduleHeartbeat();
        return super.publish(message);
    }
}
exports.ClusterAdapterWithHeartbeat = ClusterAdapterWithHeartbeat;
