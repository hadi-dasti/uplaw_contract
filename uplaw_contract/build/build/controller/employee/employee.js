"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNumberMobileEmployee = exports.employeeForgetNumberMobile = exports.getOeEmployee = exports.getAllEmployee = exports.verifyLoginEmployee = exports.employeeLogin = exports.employeeRegistration = void 0;
const user_1 = require("../../model/user/user");
const otp_1 = require("../../utile/otp");
//register employee
const employeeRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // upload filename photo
    const file = req.file;
    // console.log(file)
    try {
        // create field of req.body for push in document
        const { firstName, lastName, password, address, email, age, nationalCode, numberMobile, gender, isActive, profileImage } = req.body;
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
            profileImage
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
            data: { createDataEmployee: employeeData._id },
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
        yield checkMobileNumber.save();
        return res.status(200).json({
            success: true,
            data: {
                employeeId: checkMobileNumber._id,
                createOtp: otp
            },
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
//verify login employee with otp 
const verifyLoginEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, employeeId } = req.body;
    try {
        //check find employee with id of database
        const employee = yield user_1.User.findById({ _id: employeeId });
        if (!employee) {
            return res.status(404).json({
                success: false,
                msg: 'workerId not found'
            });
        }
        // build time  for verify and login employee
        const now = new Date();
        const timeDiff = now.getTime() - employee.verificationCodeSentAt.getTime();
        const minutesDiff = Math.floor(timeDiff / 60000);
        const time = 5 * 60 * 1000;
        // check and match time 
        if (minutesDiff > time) {
            return res.status(400).json({
                success: false,
                msg: 'Verification code has expired'
            });
        }
        // match otp 
        if (employee.mobileOtp !== otp) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid verification code'
            });
        }
        // Generate JWT
        const getToken = employee.generateAuthEmployeeToken();
        // last update document of employee 
        employee.mobileOtp = "";
        yield employee.save();
        // send token and employeeId of document for login  employee in application 
        return res.status(200).json({
            success: true,
            data: {
                getToken,
                employeeID: employee._id
            },
            msg: "successfully login employee with mobileNumber "
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: ['Internal Server Error', error.message]
        });
    }
});
exports.verifyLoginEmployee = verifyLoginEmployee;
// get All Employee 
const getAllEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllEmployee = yield user_1.User.find({}, {
            isActive: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            verificationCodeSentAt: 0,
            mobileOtp: 0
        });
        if (!AllEmployee) {
            return res.status(404).json({
                success: false,
                msg: 'Error Not Found'
            });
        }
        return res.status(200).json({
            success: true,
            data: AllEmployee,
            msg: "successfully get all data of employee document"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "internal Server Error"
        });
    }
});
exports.getAllEmployee = getAllEmployee;
// get one Employee of database 
const getOeEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const getEmployeeId = yield user_1.User.findById({ _id: id }, {
            isActive: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            verificationCodeSentAt: 0,
            mobileOtp: 0
        });
        // Error not found
        if (!getEmployeeId) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found Id Employee of database"
            });
        }
        //response data of database
        return res.status(200).json({
            success: true,
            data: getEmployeeId,
            msg: "Successfully get One Employee with Id"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
});
exports.getOeEmployee = getOeEmployee;
//forget mobileNumber
const employeeForgetNumberMobile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nationalCode, password } = req.body;
    try {
        // get nationalCode employee as database
        const getEmployee = yield user_1.User.findOne({ nationalCode });
        if (!getEmployee) {
            return res.status(400).json({
                success: false,
                msg: 'Error Not Found nationalCode employee of database'
            });
        }
        // match password employee
        const isMatchPassword = yield getEmployee.isComparePassword(password);
        if (!isMatchPassword) {
            return res.status(400).json({
                success: false,
                msg: 'password is not match '
            });
        }
        // create lastFourNumber as mobileNumber Employee
        const lastFourNumber = getEmployee.numberMobile.slice(-4);
        // response mobileNumber for employee
        return res.status(200).json({
            success: true,
            data: `mobileNumber:******${lastFourNumber}  ${"+"}  ${getEmployee._id} `,
            msg: 'successfully Get mobileNumber as database then show to employee'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            mag: 'internal Server Error'
        });
    }
});
exports.employeeForgetNumberMobile = employeeForgetNumberMobile;
// verify reset mobileNumber Employee
const verifyNumberMobileEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lastFourDigits, employeeId } = req.body;
    try {
        const getEmployee = yield user_1.User.findById({ _id: employeeId });
        // search notionalCode employee of database
        if (!getEmployee) {
            return res.status(400).json({
                success: false,
                msg: "Not Found NationalCode Employee"
            });
        }
        // match last 4 numberMobile employee
        if (getEmployee.numberMobile.slice(-4) !== lastFourDigits) {
            return res.status(400).json({
                success: false,
                msg: 'Not Match for lastFourDigits with numberMobile'
            });
        }
        // generate otp  for mobileNumber employee 
        let otp = (0, otp_1.generateOtp)(6);
        getEmployee.mobileOtp = otp;
        yield getEmployee.save();
        //TODO
        // send code otp For MobileNumber Employee
        return res.status(201).json({
            success: true,
            data: {
                createOtp: otp,
                employee: getEmployee._id
            },
            msg: 'successfully verify mobileNumber  and send code otp for employee'
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
exports.verifyNumberMobileEmployee = verifyNumberMobileEmployee;
