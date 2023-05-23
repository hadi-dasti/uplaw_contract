"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// import controller 
const adminSiteController_1 = require("../../../../controller/admin/adminSiteController");
// import validation admin
const adminValidator_1 = require("../../../../validator/adminValidation/adminValidator");
//create route register admin
router.post('/singUp', adminValidator_1.adminValidation, adminSiteController_1.registerAdmin);
exports.default = router;
