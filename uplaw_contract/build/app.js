"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.PORT = void 0;
const express = require('express');
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
//setup mongodb
const mongo_1 = __importDefault(require("./config/mongo"));
(0, mongo_1.default)();
// main router app
const mainContractRouter_1 = __importDefault(require("./router/mainContractRouter"));
// setup  environment variable
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../uplaw_contract/.env') });
exports.PORT = process.env.PORT;
//setup Express
exports.app = express();
// middleware
exports.app.use((0, helmet_1.default)());
exports.app.use(express.json());
exports.app.use(express.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)());
// path for uploadImage employee
exports.app.use('/image', express.static((0, path_1.join)(__dirname, 'image')));
// Set the view engine to EJS
exports.app.set('view engine', 'ejs');
// Set the views directory
exports.app.set('views', (0, path_1.join)(__dirname, './views/contract.ejs'));
// main router
exports.app.use('/api/v1', mainContractRouter_1.default);
// SETUP Application
exports.app.listen(exports.PORT, () => {
    console.log(`running application on port ${exports.PORT}`);
});
