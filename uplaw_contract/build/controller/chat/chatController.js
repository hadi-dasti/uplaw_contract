"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageTOEmployeeController = exports.sendMessageToServerController = exports.ShowButtonChatController = exports.id = void 0;
const Employee_1 = require("../../model/Employee/Employee");
const uuid_1 = require("uuid");
const app_1 = require("../../app");
exports.id = (0, uuid_1.v4)();
// show button in main page contract
const ShowButtonChatController = (req, res) => {
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
        }
        ;
        return res.status(200).json({
            success: true,
            data: showButton,
            msg: 'Successfully build api button Chat'
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error for button Show Chat` + err.message
        });
    }
};
exports.ShowButtonChatController = ShowButtonChatController;
// start and send message to server
const sendMessageToServerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, email } = req.body;
    try {
        // check email Employee
        const isEmailCheck = yield Employee_1.Employee.aggregate([
            {
                $match: { email }
            }
        ]);
        if (!isEmailCheck) {
            return res.status(404).json({
                success: false,
                msg: 'Email employee is not save of database'
            });
        }
        ;
        // send  message to server with unique id 
        app_1.io.emit("question", { id: exports.id, message });
        console.log(`question of employee with ${exports.id} and ${message}`);
        return res.status(200).json({
            success: true,
            msg: [exports.id, 'Question sent successfully.']
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: `Internal Server Error: ${err.message}`
        });
    }
    ;
});
exports.sendMessageToServerController = sendMessageToServerController;
// answer the question of employee with id
const messageTOEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEmployee, answer } = req.body;
    try {
        // check id employee
        if (idEmployee !== exports.id) {
            return res.status(400).json({
                success: false,
                msg: 'Bad Request for id '
            });
        }
        // send answer to employee 
        app_1.io.timeout(20000).emit('response', {
            id: exports.id,
            message: ` answer of server to employee for message ${idEmployee} was: ${answer}`
        });
        console.log(`${answer} to employee of server with unique ${idEmployee}`);
        return res.status(200).json({
            success: true,
            msg: `${answer} to employee of server with unique ${idEmployee}`
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error : ${err.message}`
        });
    }
    ;
});
exports.messageTOEmployeeController = messageTOEmployeeController;
