"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const employee_1 = __importDefault(require("./Employee/employee"));
//start application
try {
    router.use('/employee', employee_1.default);
}
catch (e) {
    console.log(e.message);
}
exports.default = router;
