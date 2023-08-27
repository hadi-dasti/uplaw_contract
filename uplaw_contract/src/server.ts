import http from 'http';
import { Server } from 'socket.io';
import { join } from 'path';
import dotenv from 'dotenv';
import app from './app';


// setup redis
import configRedis from './config/redisConfig';

//setup mongodb
import db from './config/mongo';

// join of config socket
import { configSocketServer } from './config/socketConfig';

// setup environment variable
dotenv.config({ path: join(__dirname, '../../uplaw_contract/.env') });
export const PORT = process.env.PORT;



//setup server socket
const server = http.createServer(app);
const io = new Server(server);

// run serevrs
const startServers = async () => {
    try {
        // start database
        db();
        
        //run redis
        configRedis();
        
        // run socket 
        configSocketServer(io);

        // start server app
        server.listen(PORT);
        console.log(`running server on port ${PORT}`);

    } catch (error) {
         console.error('An error occurred while starting the server:', error)
    }
};

startServers();

export { io };

