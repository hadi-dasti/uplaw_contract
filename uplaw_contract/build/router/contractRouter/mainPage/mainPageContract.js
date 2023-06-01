"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//import controller of mainPage
const mainPageContractController_1 = require("../../../controller/mainPage/mainPageContractController");
// create mainPage Router
router.get('/', mainPageContractController_1.viewContractPageController);
exports.default = router;
