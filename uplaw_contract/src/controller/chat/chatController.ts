import {Request,Response } from 'express';
import { Employee} from '../../model/Employee/Employee';
import { v4 as uuidv4 } from 'uuid';
import { io } from '../../server';
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import dotenv from 'dotenv';
import { join } from 'path';

export const id = uuidv4();

// Load environment variables from .env files
dotenv.config({path:join(__dirname, './../../.env')});

// show button in main page contract
export const ShowButtonChatController = (req: Request, res: Response) => {

        const showButton = [
            {
                form: 'BUTTON CHAT IN MAIN PAGE'
            }, {
                email: 'please enter email'
            }, {
                message: 'send message'
            }
        ];

        try {

            if (!showButton.length) {
                return res.status(400).json({
                    success: false,
                    msg: 'Error Not Found data showButton'
                });
            };

            return res.status(200).json({
                success: true,
                data: showButton,
                msg: 'Successfully build api button Chat'
            });

        } catch (err: any) {
            return res.status(500).json({
                success: false,
                msg: `Internal Server Error for button Show Chat` + err.message
            });
        }
    }

//  send message  to server 
export const sendMessageToServerController = async (req: Request, res: Response) => {
    const { message, email } = req.body;
    
    try {
        // check email Employee
        const isEmailCheck = await Employee.aggregate([
            {
                $match: { email }
            }
        ]);
        
        if (!isEmailCheck) {
            return res.status(404).json({
                success: false,
                msg: 'Email employee is not save of database'
            });
        };
        // send  message to server with unique id 
        io.emit("question", { id, message });
        console.log(`question of employee with ${id} and ${message}`);

        return res.status(200).json({
            success: true,
            msg: [id , 'Question sent successfully.']
        });
    
    } catch (err: any) {
        res.status(500).json({
            success: false,
            msg: `Internal Server Error: ${err.message}`
        });
    };
};


// answer the question of employee with id
export const messageToEmployeeController = async (req: Request, res: Response) => {
  
    const { idEmployee, answer } = req.body;

    try {
        // check id employee
        if (idEmployee !== id) {
            return res.status(400).json({
                success: false,
                msg : 'Bad Request for id '
            })
        }
            // send answer to employee 
        io.timeout(20000).emit('response', {
            id,
            message: ` answer of server to employee for message ${idEmployee} was: ${answer}`
        });
        console.log(`${answer} to employee of server with unique ${idEmployee}`);

        return res.status(200).json({
            success: true,
            msg: `${answer} to employee of server with unique ${idEmployee}`
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error : ${err.message}`
        });
    };
};

// sened event to all employee with redis_adapter
export const sendNotifToAllEmployee = async (req: Request, res: Response) => {
    const { message } = req.body;

      // Create a Redis pubClient and subClient
    const pubClient = createClient({ url: process.env.REDIS_URL });
    const subClient = pubClient.duplicate();
   

    try {
       // Connect to both Redis clients using Promise.all
       await  Promise.all([pubClient.connect(), subClient.connect()]);

        // Set up the Socket.IO adapter using createAdapter
        io.adapter(createAdapter(pubClient, subClient));
       
        // Broadcast the message to all connected clients
        io.emit('notification', message);

        // Return a success response with a message indicating that the notification was sent
        return res.status(200).json({
            success: true,
            msg: `Notification sent to all client with ${message}`
        });

    } catch (err) {
           console.log(err)
        return res.status(500).json({    
            success: false,
            msg: `Internal Server Error`
        });
    }
};






