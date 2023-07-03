"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptContract = exports.acceptContractSchema = void 0;
const mongoose_1 = require("mongoose");
;
//build schema for acceptContract
exports.acceptContractSchema = new mongoose_1.Schema({
    employeeId: [{ type: String, required: [true, 'Please provide an employeeId'] }],
    contractId: [{ type: String, required: [true, 'Please provide a contractId'] }],
    acceptContract: { type: Boolean, default: false, required: [true, 'Please provide a AcceptContract'] }
});
//build model of schema acceptContract
exports.AcceptContract = (0, mongoose_1.model)('AcceptContract', exports.acceptContractSchema);
