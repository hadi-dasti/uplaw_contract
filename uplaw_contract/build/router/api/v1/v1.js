"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const employee_1 = __importDefault(require("./Employee/employee"));
const adminSite_1 = __importDefault(require("./admin/adminSite"));
//start application
//create and response main router application
router.get('/', (req, res) => {
    return res.status(200).send(`<h1>hello main page </h1>`);
});
// create register and login employee router
router.use('/employee', employee_1.default);
// create admin router 
router.use('/admin', adminSite_1.default);
// handel Error Exception
router.use((err, req, res, next) => {
    console.log(err.stack);
    return res.status(500).json({
        success: false,
        msg: "Internal Server Error" + err.message
    });
});
exports.default = router;
