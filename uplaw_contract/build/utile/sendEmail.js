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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailOfEmployeeToApp = exports.sendRegistrationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// config server email
const transporter = nodemailer_1.default.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3f2a8d14f86771",
        pass: "c6474bdc5fec00"
    }
});
// setup email for to employee of application
const sendRegistrationEmail = (email, firstName) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'contract_uplaw',
        to: email,
        subject: 'Registration Successful',
        text: `Dear ${firstName},\n\nThank you for registering with our service!`,
        html: `<p>Dear ${firstName},</p><p>Thank you for registering with our service!</p>`,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log(`Registration email sent to ${email}`);
    }
    catch (error) {
        console.error(`Error sending registration email to ${email}: ${error}`);
    }
    ;
});
exports.sendRegistrationEmail = sendRegistrationEmail;
// send Email of employee to application
const sendEmailOfEmployeeToApp = (email, message) => __awaiter(void 0, void 0, void 0, function* () {
    const optionSendEmail = {
        from: email,
        to: "employee.email@example.com",
        subject: 'New email from employee',
        text: message
    };
    try {
        yield transporter.sendMail(optionSendEmail);
        console.log(`send ${email} of employee  with ${message} to employee.email@example.com`);
    }
    catch (err) {
        console.log(`Error of send email with ${err.message}`);
    }
    ;
});
exports.sendEmailOfEmployeeToApp = sendEmailOfEmployeeToApp;
