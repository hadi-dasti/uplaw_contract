"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log('A Employee Connected');
        socket.on('message', (message) => {
            console.log('Received message:', message);
            io.emit('message', message);
        });
        socket.on('disconnected', () => {
            console.log('Employee disconnected');
        });
    });
    // return io
};
exports.initSocket = initSocket;
