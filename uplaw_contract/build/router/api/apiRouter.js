"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const v1_1 = __importDefault(require("./v1/v1"));
// setup version 1 api
try {
    router.use('/v1', v1_1.default);
}
catch (err) {
    console.log(err.message);
}
exports.default = router;
