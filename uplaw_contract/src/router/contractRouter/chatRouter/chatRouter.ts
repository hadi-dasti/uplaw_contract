import { Router} from 'express';
// import chat controller
import { ShowButtonChatController, sendMessageToServerController, messageTOEmployeeController } from '../../../controller/chat/chatController';

// setup router 
const router: Router = Router();


// view button Chat
router.get('/viewChatButton', ShowButtonChatController);

//send message to server of employee
router.post('/sendMessage', sendMessageToServerController);

// answer the question to employee
router.post('/replyMessage', messageTOEmployeeController);


export default router;