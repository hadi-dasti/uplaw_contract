"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSocketServer = void 0;
// Configure the socket server
const configSocketServer = (io) => {
    // Listen for incoming connections
    io.on("connection", (socket) => {
        console.log("A new employee Connected");
        // handel custom event
        socket.on('chat message', (msg) => {
            console.log('Message:', msg);
            io.emit('chat message', msg);
        });
        // Listen for disconnect events
        socket.on('disconnect', () => {
            console.log('A employee disconnected');
        });
    });
    return io;
};
exports.configSocketServer = configSocketServer;
