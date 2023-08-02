"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactUsController_1 = require("../../../controller/contact_us/contactUsController");
const router = (0, express_1.Router)();
const contractUs = new contactUsController_1.ContractUsController();
// get router of contact us
router.get('/', contractUs.getContactUs.bind(contractUs));
// get link_emil and send message email in contact us router
router.get('/get_email/:employeeId', contractUs.getLinkEmail.bind(contractUs));
router.post('/send_email/sendEmail', contractUs.sendEmailToApp.bind(contractUs));
// route join on telegram
router.get('/get_telegram/:employeeId', contractUs.getJoinTelegram.bind(contractUs));
exports.default = router;
