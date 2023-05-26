"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const employee_1 = __importDefault(require("./Employee/employee"));
const adminSite_1 = __importDefault(require("./admin/adminSite"));
const mainPage_1 = __importDefault(require("./mainPage/mainPage"));
//start application
//create main page for application
router.use('/mainPage', mainPage_1.default);
// create register and login employee router
router.use('/employee', employee_1.default);
// create admin router 
router.use('/admin', adminSite_1.default);
//handel Error Exception
router.use((err, req, res, next) => {
    console.log(err.stack);
    return res.status(500).json({
        success: false,
        msg: "Internal Server Error" + err.message
    });
});
exports.default = router;
