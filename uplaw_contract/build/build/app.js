"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.PORT = void 0;
const express = require('express');
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
//setup mongodb
const mongo_1 = __importDefault(require("./config/mongo"));
(0, mongo_1.default)();
// main router app
const mainRouter_1 = __importDefault(require("./router/mainRouter"));
// setup  environment variable
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../uplaw_contract/.env') });
exports.PORT = process.env.PORT;
//setup Express
exports.app = express();
// middleware
exports.app.use(express.json());
exports.app.use(express.urlencoded({ extended: false }));
// path for uploadImage employee
exports.app.use('/image', express.static((0, path_1.join)(__dirname, 'image')));
// main router
exports.app.use(mainRouter_1.default);
// SETUP Application
exports.app.listen(exports.PORT, () => {
    console.log(`running application on port ${exports.PORT}`);
});
