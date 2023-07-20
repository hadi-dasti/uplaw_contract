import {Request,Response } from 'express';
import { Employee, IEmployee } from '../../model/Employee/Employee';
import { v4 as uuidv4 } from 'uuid';
import { io } from '../../app';
export const id = uuidv4();

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

// start and send message to server
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
export const messageTOEmployeeController = async (req: Request, res: Response) => {
  
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






