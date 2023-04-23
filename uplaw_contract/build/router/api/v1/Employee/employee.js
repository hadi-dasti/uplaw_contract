"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//import employee controller 
const employee_1 = require("../../../../controller/employee/employee");
//create rout employee 
router.post('/register', employee_1.employeeRegistration);
router.post('/login', employee_1.employeeLogin);
exports.default = router;
