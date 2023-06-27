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
exports.getAllContractController = exports.finalAcceptContractController = void 0;
const AcceptContractEmployee_1 = require("../../model/AcceptContract/AcceptContractEmployee");
const AdminSite_1 = require("../../model/Admin/AdminSite");
const Employee_1 = require("../../model/Employee/Employee");
const contract_1_1 = require("../../model/contract/contract_1");
// handel acceptContract 
const finalAcceptContractController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const { adminId, contractId } = req.body;
        // create document of model acceptContract with employee and contract
        const newAcceptContract = yield AcceptContractEmployee_1.AcceptContract.create({
            employeeId,
            contractId,
            adminId
        });
        if (!newAcceptContract) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found"
            });
        }
        ;
        // push acceptContractId on admin document
        const updatedAdmin = yield AdminSite_1.Admin.findByIdAndUpdate(adminId, {
            $push: { acceptContract: newAcceptContract._id }
        }, {
            new: true
        });
        if (!updatedAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not update Admin"
            });
        }
        ;
        // push acceptContractId on employee document
        const updatedEmployee = yield Employee_1.Employee.findByIdAndUpdate(employeeId, {
            $push: { acceptedContract: newAcceptContract._id }
        }, {
            new: true
        });
        if (!updatedEmployee) {
            return res.status(404).json({
                success: false,
                msg: "Error Not update Employee"
            });
        }
        ;
        // push acceptContractId to contract_1
        const updateContract_1 = yield contract_1_1.Contract_1.findByIdAndUpdate(contractId, {
            $push: { acceptedContract: newAcceptContract._id }
        }, {
            new: true
        });
        if (!updateContract_1) {
            return res.status(404).json({
                success: false,
                msg: "Error not updated Contract_1"
            });
        }
        ;
        return res.status(201).json({
            success: true,
            data: newAcceptContract._id,
            msg: "successfully create AcceptContract"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error in finalAcceptContractController : ${err.message}`
        });
    }
    ;
});
exports.finalAcceptContractController = finalAcceptContractController;
// read contract 
const getAllContractController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllContract = yield AcceptContractEmployee_1.AcceptContract.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "acceptedContract",
                    foreignField: "employeeId",
                    as: "employee"
                }
            },
            {
                $unwind: "$employee"
            },
            {
                $lookup: {
                    from: "contract_1",
                    localField: "acceptedContract",
                    foreignField: "contractId",
                    as: "contract_1"
                }
            },
            {
                $unwind: "$contract_1"
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "acceptedContract",
                    foreignField: "adminId",
                    as: "admin"
                }
            },
            {
                $unwind: "$admin"
            },
            {
                $project: {
                    "__v": 0,
                    "employeeId": 0,
                    "contractId": 0,
                    "adminId": 0,
                    "employee.__v": 0,
                    "employee.updatedAt": 0,
                    "employee.mobileOtp": 0,
                    "employee.acceptedContract": 0,
                    "employee.verificationCodeSentAt": 0,
                    "contract_1.__v": 0,
                    "contract_1.updatedAt": 0,
                    "contract_1.acceptedContract": 0,
                    "admin.__v": 0,
                    "admin.acceptContract": 0,
                    "admin.updatedAt": 0,
                }
            }
        ]);
        if (!getAllContract) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found AcceptContract"
            });
        }
        ;
        return res.status(200).json({
            success: true,
            data: getAllContract,
            msg: "Successfully create get all acceptContract"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error in getAllContractController : ${err.message}`
        });
    }
    ;
});
exports.getAllContractController = getAllContractController;
