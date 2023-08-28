"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShardedAdapter = void 0;
const cluster_adapter_1 = require("./cluster-adapter");
const notepack_io_1 = require("notepack.io");
const util_1 = require("./util");
const debug_1 = require("debug");
const debug = (0, debug_1.default)("socket.io-redis");
/**
 * Create a new Adapter based on Redis sharded Pub/Sub introduced in Redis 7.0.
 *
 * @see https://redis.io/docs/manual/pubsub/#sharded-pubsub
 *
 * @param pubClient - the Redis client used to publish (from the `redis` package)
 * @param subClient - the Redis client used to subscribe (from the `redis` package)
 * @param opts - some additional options
 */
function createShardedAdapter(pubClient, subClient, opts) {
    return function (nsp) {
        return new ShardedRedisAdapter(nsp, pubClient, subClient, opts);
    };
}
exports.createShardedAdapter = createShardedAdapter;
class ShardedRedisAdapter extends cluster_adapter_1.ClusterAdapter {
    constructor(nsp, pubClient, subClient, opts) {
        super(nsp);
        this.pubClient = pubClient;
        this.subClient = subClient;
        this.opts = Object.assign({
            channelPrefix: "socket.io",
            subscriptionMode: "dynamic",
        }, opts);
        this.channel = `${this.opts.channelPrefix}#${nsp.name}#`;
        this.responseChannel = `${this.opts.channelPrefix}#${nsp.name}#${this.uid}#`;
        const handler = (message, channel) => this.onRawMessage(message, channel);
        (0, util_1.SSUBSCRIBE)(this.subClient, this.channel, handler);
        (0, util_1.SSUBSCRIBE)(this.subClient, this.responseChannel, handler);
        if (this.opts.subscriptionMode === "dynamic") {
            this.on("create-room", (room) => {
                const isPublicRoom = !this.sids.has(room);
                if (isPublicRoom) {
                    (0, util_1.SSUBSCRIBE)(this.subClient, this.dynamicChannel(room), handler);
                }
            });
            this.on("delete-room", (room) => {
                const isPublicRoom = !this.sids.has(room);
                if (isPublicRoom) {
                    (0, util_1.SUNSUBSCRIBE)(this.subClient, this.dynamicChannel(room));
                }
            });
        }
    }
    close() {
        const channels = [this.channel, this.responseChannel];
        if (this.opts.subscriptionMode === "dynamic") {
            this.rooms.forEach((_sids, room) => {
                const isPublicRoom = !this.sids.has(room);
                if (isPublicRoom) {
                    channels.push(this.dynamicChannel(room));
                }
            });
        }
        return Promise.all(channels.map((channel) => (0, util_1.SUNSUBSCRIBE)(this.subClient, channel))).then();
    }
    publishMessage(message) {
        const channel = this.computeChannel(message);
        debug("publishing message of type %s to %s", message.type, channel);
        (0, util_1.SPUBLISH)(this.pubClient, channel, this.encode(message));
        return Promise.resolve("");
    }
    computeChannel(message) {
        // broadcast with ack can not use a dynamic channel, because the serverCount() method return the number of all
        // servers, not only the ones where the given room exists
        const useDynamicChannel = this.opts.subscriptionMode === "dynamic" &&
            message.type === cluster_adapter_1.MessageType.BROADCAST &&
            message.data.requestId === undefined &&
            message.data.opts.rooms.length === 1;
        if (useDynamicChannel) {
            return this.dynamicChannel(message.data.opts.rooms[0]);
        }
        else {
            return this.channel;
        }
    }
    dynamicChannel(room) {
        return this.channel + room + "#";
    }
    publishResponse(requesterUid, response) {
        debug("publishing response of type %s to %s", response.type, requesterUid);
        (0, util_1.SPUBLISH)(this.pubClient, `${this.channel}${requesterUid}#`, this.encode(response));
    }
    encode(message) {
        const mayContainBinary = [
            cluster_adapter_1.MessageType.BROADCAST,
            cluster_adapter_1.MessageType.BROADCAST_ACK,
            cluster_adapter_1.MessageType.FETCH_SOCKETS_RESPONSE,
            cluster_adapter_1.MessageType.SERVER_SIDE_EMIT,
            cluster_adapter_1.MessageType.SERVER_SIDE_EMIT_RESPONSE,
        ].includes(message.type);
        if (mayContainBinary && (0, util_1.hasBinary)(message.data)) {
            return (0, notepack_io_1.encode)(message);
        }
        else {
            return JSON.stringify(message);
        }
    }
    onRawMessage(rawMessage, channel) {
        let message;
        try {
            if (rawMessage[0] === 0x7b) {
                message = JSON.parse(rawMessage.toString());
            }
            else {
                message = (0, notepack_io_1.decode)(rawMessage);
            }
        }
        catch (e) {
            return debug("invalid format: %s", e.message);
        }
        if (channel.toString() === this.responseChannel) {
            this.onResponse(message);
        }
        else {
            this.onMessage(message);
        }
    }
    serverCount() {
        return (0, util_1.PUBSUB)(this.pubClient, "SHARDNUMSUB", this.channel);
    }
}
