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
exports.employeeLogin = exports.employeeRegistration = void 0;
const user_1 = require("../../model/user/user");
const otp_1 = require("../../utile/otp");
const employeeRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // create field of req.body for push in document
        const { firstName, lastName, password, address, email, age, nationalCode, numberMobile, gender, isActive, createAt } = req.body;
        // create document and  save to document
        const employeeData = yield user_1.User.create({
            firstName,
            lastName,
            password,
            address,
            email,
            age,
            nationalCode,
            numberMobile,
            gender,
            isActive,
            createAt
        });
        // check request body
        if (!employeeData) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found Error'
            });
        }
        // response data from employee       
        return res.status(201).json({
            success: true,
            data: { createDataEmployee: employeeData },
            msg: 'successfully create document user on database'
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: ['Internal Server Error', error]
        });
    }
});
exports.employeeRegistration = employeeRegistration;
//login employee
const employeeLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check numberMobile employee
        const { numberMobile } = req.body;
        const checkMobileNumber = yield user_1.User.findOne({ numberMobile });
        if (!checkMobileNumber) {
            return res.status(404).json({
                success: false,
                msg: 'mobileNumber_not_found_ERR'
            });
        }
        // generate otp employee
        let otp = (0, otp_1.generateOtp)(6);
        checkMobileNumber.mobileOtp = otp;
        console.log(otp);
        yield checkMobileNumber.save();
        return res.status(200).json({
            success: true,
            data: { employeeId: checkMobileNumber._id },
            msg: 'successfully send otp to mobileNumber employee'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
});
exports.employeeLogin = employeeLogin;
