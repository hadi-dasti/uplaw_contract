"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import chat controller
const chatController_1 = require("../../../controller/chat/chatController");
// setup router 
const router = (0, express_1.Router)();
// view button Chat
router.get('/viewChatButton', chatController_1.ShowButtonChatController);
//send message to server of employee
router.post('/sendMessage', chatController_1.sendMessageToServerController);
// answer the question to employee
router.post('/replyMessage', chatController_1.messageTOEmployeeController);
exports.default = router;
