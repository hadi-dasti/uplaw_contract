"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Implementation of contract homepage routers for version_1
const mainPageContract_1 = __importDefault(require("./contractRouter/mainPage/mainPageContract"));
router.use('/contract', mainPageContract_1.default);
// Implementation of contract employee routers for version_1
const employeeRouter_1 = __importDefault(require("./contractRouter/Employee/employeeRouter"));
router.use('/contract/employee', employeeRouter_1.default);
// Implementation of contract admin routers for version_1
const adminSite_1 = __importDefault(require("./contractRouter/admin/adminSite"));
router.use('/contract/admin', adminSite_1.default);
exports.default = router;
