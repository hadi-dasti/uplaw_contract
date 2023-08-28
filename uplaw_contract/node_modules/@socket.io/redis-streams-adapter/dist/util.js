"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomId = exports.hasBinary = void 0;
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
