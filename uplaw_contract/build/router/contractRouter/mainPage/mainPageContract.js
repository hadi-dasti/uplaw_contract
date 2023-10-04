"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import controller of mainPage
const mainPageContractController_1 = require("../../../controller/mainPage/mainPageContractController");
const router = (0, express_1.Router)();
// create mainPage Router
router.get('/', mainPageContractController_1.viewContractPageController);
exports.default = router;
