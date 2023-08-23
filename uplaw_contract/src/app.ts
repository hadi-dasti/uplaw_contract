import express, { Application } from 'express';
import { join } from 'path';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';``
import passport from "passport";
import './config/passport_config';

// setup redis
import configRedis from './config/redisConfig';

//setup mongodb
import db from './config/mongo';

// join of config socket
import { configSocketServer } from './config/socketConfig';

// main router app
import mainRouter from './router/mainContractRouter';

// setup environment variable
dotenv.config({ path: join(__dirname, '../../uplaw_contract/.env') });
export const PORT = process.env.PORT;

//start Application
export const app: Application = express();



//setup server socket
const server = http.createServer(app);
const io = new Server(server);
export { io };

const startServer = async () => {

    try {
        //setup Express
        // middleware
        app.use(helmet());
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cors());
        // path for uploadImage employee
        app.use('/image', express.static(join(__dirname, 'image')));

        // Set the view engine to EJS
        app.set('view engine', 'ejs');

        // Set the views directory
        app.set('views', join(__dirname, 'views'));

        // main router
        app.use('/api/v1', mainRouter);

        //run passport
        app.use(passport.initialize());

        // start server app
        server.listen(PORT);
        console.log(`running server on port ${PORT}`);

        // start database
        db();
        
        //run redis
        configRedis();

        // run socket 
        configSocketServer(io);
   
    } catch (err: any) {
        console.log(err.stack);
    };
};
     
startServer();




