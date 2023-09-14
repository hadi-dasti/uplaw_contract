import { Router } from "express";

import { Sender_Reciver_Email_Queu } from '../../../controller/queue_emai/queueEmailController';

const router: Router = Router();

const buildQueueMessages = new Sender_Reciver_Email_Queu();



router.post('/senedEmailToQueue', buildQueueMessages.sendMessageToQueue.bind(buildQueueMessages));

router.get('/reciveMessageQueue')


export default router;