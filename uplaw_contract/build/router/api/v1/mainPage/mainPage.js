"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//import controller of mainPage
const mainPage_1 = require("../../../../controller/mainPage/mainPage");
// create mainPage Router
router.get('/viewContract', mainPage_1.viewContractPage);
exports.default = router;
