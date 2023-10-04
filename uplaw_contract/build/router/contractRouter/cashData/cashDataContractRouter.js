"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cashDataController_1 = require("../../../controller/cashData/cashDataController");
const router = (0, express_1.Router)();
// create object readCashData instanse of class cashDataContract
const cashDataContract = new cashDataController_1.CashDataContractController();
// get cash data router
router.get('/get_contract', cashDataContract.setCashContract.bind(cashDataContract));
exports.default = router;
