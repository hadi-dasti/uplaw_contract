"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
// import controller 
var adminSiteController_1 = require("../../../../controller/admin/adminSiteController");
// import validation admin
var adminValidator_1 = require("../../../../validator/adminValidation/adminValidator");
//create route register admin
router.post('/singUp', adminValidator_1.adminValidation, adminSiteController_1.registerAdmin);
exports["default"] = router;
