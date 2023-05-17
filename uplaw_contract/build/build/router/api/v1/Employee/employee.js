"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//import employee controller 
const employee_1 = require("../../../../controller/employee/employee");
// middleware for upload image employee
const uploadImage_1 = __importDefault(require("../../../../middleware/upload/uploadImage"));
//create router employee 
router.post('/register', uploadImage_1.default.single('profileImage'), employee_1.employeeRegistration);
router.post('/login', employee_1.employeeLogin);
router.post('/verifyEmployeeLogin', employee_1.verifyLoginEmployee);
router.get('/getAllEmployee', employee_1.getAllEmployee);
router.get('/getOneEmployee/:id', employee_1.getOeEmployee);
// create router for forget and reset mobileNumber employee of database
router.post('/forgetNumberMobile', employee_1.employeeForgetNumberMobile);
router.post('/verify_mobileNumber_employee', employee_1.verifyNumberMobileEmployee);
exports.default = router;
