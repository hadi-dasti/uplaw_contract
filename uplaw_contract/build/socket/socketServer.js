"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSocketServer = void 0;
const configSocketServer = (io) => {
    io.on("connection", (socket) => {
        console.log("A employee Connected");
        // handel custom event
        socket.on('chat message', (msg) => {
            console.log('Message:', msg);
            io.emit('chat message', msg);
        });
        socket.on('disconnected', () => {
            console.log('A employee disconnected');
        });
    });
    return io;
};
exports.configSocketServer = configSocketServer;
