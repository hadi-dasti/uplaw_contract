"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const apiRouter_1 = __importDefault(require("./api/apiRouter"));
// setup apiRouter
try {
    router.use('/api', apiRouter_1.default);
}
catch (e) {
    console.log(e.message);
}
exports.default = router;
