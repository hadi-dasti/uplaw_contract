"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require('express');
const dotenv = __importStar(require("dotenv"));
//setup mongodb
const mongo_1 = __importDefault(require("./config/mongo"));
(0, mongo_1.default)();
// main router app
const mainRouter_1 = __importDefault(require("./router/mainRouter"));
// setup  environment variable
dotenv.config();
const port = process.env.PORT || 3000;
//setup Express
exports.app = express();
// middleware
exports.app.use(express.json());
exports.app.use(express.urlencoded({ extended: false }));
exports.app.use('/', mainRouter_1.default);
// SETUP Application
exports.app.listen(port, () => {
    console.log(`running application on port ${port}`);
});
