"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Authorization for employee
const authEmployee_1 = require("../../../../middleware/authEmployee/authEmployee");
//import employee controller 
const employee_1 = require("../../../../controller/employee/employee");
// middleware for upload image employee
const uploadImage_1 = __importDefault(require("../../../../middleware/upload/uploadImage"));
// validation employee
const employeeValidation_1 = require("../../../../validator/employeeValidator/employeeValidation");
//create router employee 
router.post('/register', uploadImage_1.default.single('profileImage'), employeeValidation_1.validateRegisterEmployee, employee_1.employeeRegistration);
router.post('/login', employeeValidation_1.validateLoginEmployee, employee_1.employeeLogin);
router.post('/verifyEmployeeLogin', employeeValidation_1.validateVerifyEmployee, employee_1.verifyLoginEmployee);
router.get('/getAllEmployee', authEmployee_1.authEmployee, employee_1.getAllEmployee);
router.get('/getOneEmployee/:id', authEmployee_1.authEmployee, employee_1.getOeEmployee);
router.delete('/deleteEmployee/:id', employeeValidation_1.validateDeleteIDEmployee, employee_1.deleteEmployee);
// create router for forget and reset password  employee of database
router.post('/forgetNumberMobile', employeeValidation_1.validateForgetPasswordEmployee, employee_1.employeeForgetPassword);
router.post('/verify_mobileNumber_employee', employeeValidation_1.validateResetPasswordEmployee, employee_1.resetPasswordEmployee);
exports.default = router;
