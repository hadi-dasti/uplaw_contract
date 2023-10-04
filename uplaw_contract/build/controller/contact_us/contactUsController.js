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
exports.ContractUsController = void 0;
const Employee_1 = require("../../model/Employee/Employee");
const sendEmail_1 = require("../../utile/sendEmail");
;
;
class ContractUsController {
    constructor() {
        // Define the contactUs object with office contact number and address
        this.contactUs = {
            OfficeContactNumber: "ddddddddddddd",
            OfficeَAddress: "ffffffffffffffffffffff"
        };
        // Define the emailLink object with a default email
        this.email_link = {
            email: "hadidasti98@gmail.com",
        };
    }
    // Handler for getting the contact us information
    getContactUs(req, res) {
        if (!this.contactUs) {
            return res.status(404).json({
                success: false,
                msg: 'Error not found contact_us'
            });
        }
        ;
        return res.status(200).json({
            success: true,
            data: this.contactUs,
            msg: "successfully build contact_us"
        });
    }
    ;
    /// Handler for getting the email link for an employee
    getLinkEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employeeId } = req.params;
            try {
                const employee = yield Employee_1.Employee.findById({ _id: employeeId });
                if (!employee) {
                    return res.status(404).json({
                        success: false,
                        msg: "Employee not found"
                    });
                }
                const emailLink = `mailto:${employee.email}`;
                this.email_link.email = emailLink;
                return res.status(200).json({
                    success: true,
                    data: { emailLink },
                    msg: "successfully build link to email "
                });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    msg: `Internal Server Error: ${err.message}`
                });
            }
            ;
        });
    }
    ;
    // Handler for sending an email to the application
    sendEmailToApp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, message } = req.body;
            try {
                if (this.email_link.email !== email) {
                    return res.status(400).json({
                        success: false,
                        msg: "Error not match id for send email"
                    });
                }
                ;
                // Logic for sending the email to the application
                yield (0, sendEmail_1.sendEmailOfEmployeeToApp)(email, message);
                return res.status(200).json({
                    success: true,
                    data: `send ${message} with ${email}`,
                    msg: "successfully send message to application"
                });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    msg: `Internal Server Error : ${err.message} `
                });
            }
            ;
        });
    }
    ;
    // Handler for getting the Telegram join link for an employee
    getJoinTelegram(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employeeId } = req.params;
            try {
                // Find the employee by their ID
                const employeeJoin = yield Employee_1.Employee.findById({ _id: employeeId });
                if (!employeeJoin) {
                    return res.status(404).json({
                        success: false,
                        msg: 'Error Not Found '
                    });
                }
                ;
                // Build the Telegram join link using the employee's Telegram username
                const telegramLink = `https://t.me/${employeeJoin.telegram_username}`;
                return res.status(200).json({
                    success: true,
                    data: { telegramLink },
                    msg: "Successfully build link to join Telegram"
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
    }
    ;
}
exports.ContractUsController = ContractUsController;
;
