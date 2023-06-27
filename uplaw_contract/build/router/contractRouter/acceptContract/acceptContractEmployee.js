"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// import controller
const acceptContractEmployeeController_1 = require("../../../controller/acceptContract/acceptContractEmployeeController");
// accept contract router of employee 
router.post('/finalAccept/:employeeId', acceptContractEmployeeController_1.finalAcceptContractController);
router.get('/finalContract/readContract', acceptContractEmployeeController_1.getAllContractController);
exports.default = router;
