"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controller for handel router refershToken
const employeeRefreshTokenController_1 = require("../../../controller/employee/employeeRefreshTokenController");
const router = (0, express_1.Router)();
router.post('/', employeeRefreshTokenController_1.employeeRefreshTokenController);
exports.default = router;
