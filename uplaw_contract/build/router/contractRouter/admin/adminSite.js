"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// import controller 
const adminSiteController_1 = require("../../../controller/admin/adminSiteController");
// import validation admin
const adminValidator_1 = require("../../../validator/adminValidation/adminValidator");
//create route register admin
router.post('/singUp', adminValidator_1.adminValidation, adminSiteController_1.registerAdmin);
router.get('/getAdmin/:id', adminValidator_1.validationAdminId, adminSiteController_1.getAdmin);
router.patch('/updateAdmin/:id', adminValidator_1.validationAdminId, adminValidator_1.adminUpdateValidation, adminSiteController_1.updateAdmin);
router.delete('/deleteAdmin/:id', adminValidator_1.validationAdminId, adminSiteController_1.deleteAdmin);
exports.default = router;
