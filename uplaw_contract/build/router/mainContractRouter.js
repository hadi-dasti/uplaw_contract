"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aboutMeRouter_1 = __importDefault(require("./contractRouter/about_me/aboutMeRouter"));
const articleRouter_1 = __importDefault(require("./contractRouter/article/articleRouter"));
const mainPageContract_1 = __importDefault(require("./contractRouter/mainPage/mainPageContract"));
const chatRouter_1 = __importDefault(require("./contractRouter/chatRouter/chatRouter"));
const employeeRouter_1 = __importDefault(require("./contractRouter/employee/employeeRouter"));
const adminSite_1 = __importDefault(require("./contractRouter/admin/adminSite"));
const contractRouter_1_1 = __importDefault(require("./contractRouter/contract/contractRouter_1"));
const acceptContractEmployee_1 = __importDefault(require("./contractRouter/acceptContract/acceptContractEmployee"));
// setup router of Router Express
const router = (0, express_1.Router)();
// Implementation of contract homepage routers for version_1
router.use('/contract', mainPageContract_1.default);
// Implementation  of article in contract page
router.use('/contract/article', articleRouter_1.default);
// Implementation  of about_me in contract page
router.use('/contract/about_me', aboutMeRouter_1.default);
// Implementation of contract chat_socket homepage routers for version_1
router.use('/contract/chat', chatRouter_1.default);
// Implementation of contract employee routers for version_1
router.use('/contract/employee', employeeRouter_1.default);
// Implementation of contract admin routers for version_1
router.use('/contract/admin', adminSite_1.default);
// Implementation of contracts routers for version_1
router.use('/contract/contract_1', contractRouter_1_1.default);
// Implementation of the router to accept the employee contract version_1
router.use('/contract/contract_1/acceptContract', acceptContractEmployee_1.default);
exports.default = router;
