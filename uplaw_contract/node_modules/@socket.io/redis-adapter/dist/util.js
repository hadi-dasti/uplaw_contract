"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBSUB = exports.SPUBLISH = exports.SUNSUBSCRIBE = exports.SSUBSCRIBE = exports.sumValues = exports.parseNumSubResponse = exports.randomId = exports.hasBinary = void 0;
const crypto_1 = require("crypto");
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (obj instanceof ArrayBuffer || ArrayBuffer.isView(obj)) {
        return true;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && !toJSON) {
        return hasBinary(obj.toJSON(), true);
    }
    return false;
}
exports.hasBinary = hasBinary;
function randomId() {
    return (0, crypto_1.randomBytes)(8).toString("hex");
}
exports.randomId = randomId;
function parseNumSubResponse(res) {
    return parseInt(res[1], 10);
}
exports.parseNumSubResponse = parseNumSubResponse;
function sumValues(values) {
    return values.reduce((acc, val) => {
        return acc + val;
    }, 0);
}
exports.sumValues = sumValues;
const RETURN_BUFFERS = true;
/**
 * Whether the client comes from the `redis` package
 *
 * @param redisClient
 *
 * @see https://github.com/redis/node-redis
 */
function isRedisV4Client(redisClient) {
    return typeof redisClient.sSubscribe === "function";
}
function SSUBSCRIBE(redisClient, channel, handler) {
    if (isRedisV4Client(redisClient)) {
        redisClient.sSubscribe(channel, handler, RETURN_BUFFERS);
    }
    else {
        redisClient.ssubscribe(channel);
        redisClient.on("smessageBuffer", (rawChannel, message) => {
            if (rawChannel.toString() === channel) {
                handler(message, rawChannel);
            }
        });
    }
}
exports.SSUBSCRIBE = SSUBSCRIBE;
function SUNSUBSCRIBE(redisClient, channel) {
    if (isRedisV4Client(redisClient)) {
        redisClient.sUnsubscribe(channel);
    }
    else {
        redisClient.sunsubscribe(channel);
    }
}
exports.SUNSUBSCRIBE = SUNSUBSCRIBE;
function SPUBLISH(redisClient, channel, payload) {
    if (isRedisV4Client(redisClient)) {
        redisClient.sPublish(channel, payload);
    }
    else {
        redisClient.spublish(channel, payload);
    }
}
exports.SPUBLISH = SPUBLISH;
function PUBSUB(redisClient, arg, channel) {
    if (redisClient.constructor.name === "Cluster" || redisClient.isCluster) {
        // ioredis cluster
        return Promise.all(redisClient.nodes().map((node) => {
            return node
                .send_command("PUBSUB", [arg, channel])
                .then(parseNumSubResponse);
        })).then(sumValues);
    }
    else if (isRedisV4Client(redisClient)) {
        const isCluster = Array.isArray(redisClient.masters);
        if (isCluster) {
            // redis@4 cluster
            const nodes = redisClient.masters;
            return Promise.all(nodes.map((node) => {
                return node.client
                    .sendCommand(["PUBSUB", arg, channel])
                    .then(parseNumSubResponse);
            })).then(sumValues);
        }
        else {
            // redis@4 standalone
            return redisClient
                .sendCommand(["PUBSUB", arg, channel])
                .then(parseNumSubResponse);
        }
    }
    else {
        // ioredis / redis@3 standalone
        return new Promise((resolve, reject) => {
            redisClient.send_command("PUBSUB", [arg, channel], (err, numSub) => {
                if (err)
                    return reject(err);
                resolve(parseNumSubResponse(numSub));
            });
        });
    }
}
exports.PUBSUB = PUBSUB;
