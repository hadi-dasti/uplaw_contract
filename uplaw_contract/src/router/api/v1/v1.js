"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
var employee_1 = require("./Employee/employee");
var adminSite_1 = require("./admin/adminSite");
//start application
//create and response main router application
router.get('/', function (req, res) {
    return res.status(200).send("<h1>hello main page </h1>");
});
// create register and login employee router
router.use('/employee', employee_1["default"]);
// create admin router 
router.use('/admin', adminSite_1["default"]);
// handel Error Exception
router.use(function (err, req, res, next) {
    console.log(err.stack);
    return res.status(500).json({
        success: false,
        msg: "Internal Server Error" + err.message
    });
});
exports["default"] = router;
