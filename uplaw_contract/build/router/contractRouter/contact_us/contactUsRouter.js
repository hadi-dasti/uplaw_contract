"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactUsController_1 = require("../../../controller/contact_us/contactUsController");
//build router of instance Router Express
const router = (0, express_1.Router)();
// Create a new instance of the ContactUsController class
const contractUsController = new contactUsController_1.ContractUsController();
// Define the routes for the contact us page
router.get('/', contractUsController.getContactUs.bind(contractUsController));
// Get the email link for a specific employee
router.get('/get_email/:employeeId', contractUsController.getLinkEmail.bind(contractUsController));
// Send an email to the app
router.post('/send_email/sendEmail', contractUsController.sendEmailToApp.bind(contractUsController));
// Join the Telegram group for a specific employee
router.get('/get_telegram/:employeeId', contractUsController.getJoinTelegram.bind(contractUsController));
exports.default = router;
