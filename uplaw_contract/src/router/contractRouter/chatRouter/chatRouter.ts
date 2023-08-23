import { Router} from 'express';
// import chat controller
import { ShowButtonChatController, sendMessageToServerController,messageToEmployeeController, sendNotifToAllEmployee} from '../../../controller/chat/chatController';

// setup router 
const router: Router = Router();


// view button Chat
router.get('/viewChatButton', ShowButtonChatController);

//send message to server of employee
router.post('/sendMessage', sendMessageToServerController);

// answer the question to employee
router.post('/replyMessage', messageToEmployeeController);

// send event to all employee with acknowledgements
router.post('/event_to_all_Employee', sendNotifToAllEmployee);


export default router;