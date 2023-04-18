"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
var employee_1 = require("./Employee/employee");
//start application
try {
    router.use('/employee', employee_1["default"]);
}
catch (e) {
    console.log(e.message);
}
exports["default"] = router;
