"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAcceptContractController = exports.getAllContractController = exports.finalAcceptContractController = void 0;
const AcceptContractEmployee_1 = require("../../model/AcceptContract/AcceptContractEmployee");
const AdminSite_1 = require("../../model/Admin/AdminSite");
const Employee_1 = require("../../model/Employee/Employee");
const mongoose_1 = require("mongoose");
// handel acceptContract of employer
const finalAcceptContractController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, contractId, acceptContract } = req.body;
    try {
        // build document on mongodb of model AcceptContract 
        const buildAcceptContract = yield AcceptContractEmployee_1.AcceptContract.create({
            employeeId,
            contractId,
            acceptContract
        });
        // handel Error build AcceptContract
        if (!buildAcceptContract) {
            return res.status(404).json({
                success: false,
                msg: "Error of NOt build document of model AcceptContract"
            });
        }
        ;
        // UPDATE EMPLOYEE AND SEND TO EMPLOYEE SCHEMA
        const updateEmployee = yield Employee_1.Employee.findByIdAndUpdate(employeeId, {
            $push: {
                acceptedContract: buildAcceptContract._id
            },
        }, {
            new: true
        });
        //handel Error updateEmployee
        if (!updateEmployee) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Update EmployeeId"
            });
        }
        ;
        return res.status(201).json({
            success: true,
            data: buildAcceptContract,
            msg: "Successfully build AcceptContract of employee"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error on AcceptContract : ${error.message} `
        });
    }
    ;
});
exports.finalAcceptContractController = finalAcceptContractController;
// get contract with aggregation pipeline
const getAllContractController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // build data of one document
    const acceptContractId = new mongoose_1.Types.ObjectId('649f82f3b12be8424843d442');
    try {
        const getFinalContractAccept = yield AcceptContractEmployee_1.AcceptContract.aggregate([
            {
                $match: {
                    _id: acceptContractId,
                }
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "acceptedContract",
                    foreignField: "employeeId",
                    as: "employee_doc"
                }
            },
            {
                $unwind: "$employee_doc"
            },
            {
                $lookup: {
                    from: "contract_1",
                    localField: "acceptedContract",
                    foreignField: "contractId",
                    as: "contract_doc"
                }
            },
            {
                $unwind: "$contract_doc"
            },
            {
                $project: {
                    "__v": 0,
                    "employeeId": 0,
                    "contractId": 0,
                    "employee_doc.verificationCodeSentAt": 0,
                    "employee_doc.updatedAt": 0,
                    "employee_doc.__v": 0,
                    "employee_doc.mobileOtp": 0,
                    "employee_doc.acceptedContract": 0,
                    "employee_doc.createAt": 0,
                    "employee_doc.password": 0,
                    "contract_doc.__v": 0,
                    "contract_doc.acceptedContract": 0,
                    "contract_doc.updatedAt": 0,
                }
            },
            {
                $limit: 1
            }
        ]);
        if (!getFinalContractAccept) {
            return res.status(404).json({
                success: false,
                msg: "Error not Found of finalAcceptContract"
            });
        }
        ;
        return res.status(200).json({
            success: true,
            data: getFinalContractAccept,
            msg: "Successfully  get FinalContractAccept"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error on getAcceptContract : ${error.message} `
        });
    }
    ;
});
exports.getAllContractController = getAllContractController;
// handel send contractAccept to admin
const sendAcceptContractController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { acceptContractId, adminId } = req.body;
    try {
        const sendAcceptContract = new AcceptContractEmployee_1.AcceptContract({
            acceptContractId
        });
        if (!sendAcceptContract) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found of acceptContractId"
            });
        }
        ;
        // send acceptContract 
        const updateAdmin = yield AdminSite_1.Admin.findByIdAndUpdate(adminId, {
            $push: {
                finalAcceptContract: sendAcceptContract._id
            }
        }, {
            new: true
        });
        if (!updateAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not found for adminId"
            });
        }
        ;
        return res.status(201).json({
            success: true,
            msg: `successfully send finalContractAccept to ${adminId} of ${acceptContractId}`
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error of sendContractAccept : ${error.message}`
        });
    }
    ;
});
exports.sendAcceptContractController = sendAcceptContractController;
