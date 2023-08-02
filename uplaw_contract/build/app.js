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
exports.io = exports.app = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
// setup redis
const redisConfig_1 = __importDefault(require("./config/redisConfig"));
//setup mongodb
const mongo_1 = __importDefault(require("./config/mongo"));
// join of config socket
const socketConfig_1 = require("./config/socketConfig");
// main router app
const mainContractRouter_1 = __importDefault(require("./router/mainContractRouter"));
// setup environment variable
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../uplaw_contract/.env') });
exports.PORT = process.env.PORT;
//start Application
exports.app = (0, express_1.default)();
//setup server socket
const server = http_1.default.createServer(exports.app);
const io = new socket_io_1.Server(server);
exports.io = io;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //setup Express
        // middleware
        exports.app.use((0, helmet_1.default)());
        exports.app.use(express_1.default.json());
        exports.app.use(express_1.default.urlencoded({ extended: true }));
        exports.app.use((0, cors_1.default)());
        // path for uploadImage employee
        exports.app.use('/image', express_1.default.static((0, path_1.join)(__dirname, 'image')));
        // Set the view engine to EJS
        exports.app.set('view engine', 'ejs');
        // Set the views directory
        exports.app.set('views', (0, path_1.join)(__dirname, 'views'));
        // main router
        exports.app.use('/api/v1', mainContractRouter_1.default);
        // start server app
        server.listen(exports.PORT);
        console.log(`running server on port ${exports.PORT}`);
        // start database
        (0, mongo_1.default)();
        //run redis
        (0, redisConfig_1.default)();
        // run socket 
        (0, socketConfig_1.configSocketServer)(io);
    }
    catch (err) {
        console.log(err.stack);
    }
    ;
});
startServer();
