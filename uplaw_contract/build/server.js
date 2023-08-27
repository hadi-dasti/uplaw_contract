"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.PORT = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
// setup redis
const redisConfig_1 = __importDefault(require("./config/redisConfig"));
//setup mongodb
const mongo_1 = __importDefault(require("./config/mongo"));
// join of config socket
const socketConfig_1 = require("./config/socketConfig");
// setup environment variable
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../uplaw_contract/.env') });
exports.PORT = process.env.PORT;
//setup server socket
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server);
exports.io = io;
// run serevrs
const startServers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // start database
        (0, mongo_1.default)();
        //run redis
        (0, redisConfig_1.default)();
        // run socket 
        (0, socketConfig_1.configSocketServer)(io);
        // start server app
        server.listen(exports.PORT);
        console.log(`running server on port ${exports.PORT}`);
    }
    catch (error) {
        console.error('An error occurred while starting the server:', error);
    }
});
startServers();
