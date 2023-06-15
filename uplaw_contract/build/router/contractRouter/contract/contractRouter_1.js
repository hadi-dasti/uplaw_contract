"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// build controller of contract version 1
const contractController_v1_1 = require("../../../controller/contract/contractController_v1");
// build router contract of version 1
router.post('/buildContract_1', contractController_v1_1.createContract_1);
router.get('/readContract/:contractId', contractController_v1_1.readContract_1);
router.put('/updateContract/:contractId', contractController_v1_1.updateContract_1);
router.delete('/deleteContract/:ContractId', contractController_v1_1.deleteContract_1);
exports.default = router;
