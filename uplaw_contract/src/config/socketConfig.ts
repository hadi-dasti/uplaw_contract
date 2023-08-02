import { Server, Socket } from 'socket.io';



export const configSocketServer = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("A employee Connected");

        // handel custom event
        socket.on('chat message', (msg: string) => {
            console.log('Message:', msg);
            io.emit('chat message', msg)
        });
        socket.on('disconnected', () => {
            console.log('A employee disconnected')
        });
    });
    return io;
};

