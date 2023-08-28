import type { Server, Socket } from 'socket.io'; 


// Configure the socket server
export const configSocketServer = (io: Server): Server => {
     // Listen for incoming connections
    io.on("connection", (socket: Socket) => {
        console.log("A new employee Connected");

        // handel custom event
        socket.on('chat message', (msg: string) => {
            console.log('Message:', msg);
            io.emit('chat message', msg)
        });
        // Listen for disconnect events
        socket.on('disconnect', () => {
            console.log('A employee disconnected');
        });
    });
    return io;
};

