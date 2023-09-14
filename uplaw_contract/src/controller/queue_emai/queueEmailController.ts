import { Request,Response } from 'express';
import { connectRabitmq } from './../../config/rabbitmq';



export class Sender_Reciver_Email_Queu{

    private readonly QUEUE_NAME = 'emailQueue';
    private readonly text = {
        item_id: "macbook",
        text: "This is a sample message to send receiver to check the ordered Item Availablility",
    };

  public async sendMessageToQueue(req:Request,res:Response) {
       
       

    }

}