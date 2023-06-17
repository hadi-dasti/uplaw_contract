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
exports.deleteContract_1 = exports.updateContract_1 = exports.readContract_1 = exports.createContract_1 = void 0;
const contract_1_1 = require("../../model/contract/contract_1");
const mongoose_1 = require("mongoose");
// build contract_1
const createContract_1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // request body of  model contract_1
    const { title, description, typeContract, price, paragraphs, } = req.body;
    try {
        const createContract = yield contract_1_1.Contract_1.create({
            title,
            description,
            typeContract,
            price,
            paragraphs: paragraphs.map((paragraphData) => ({
                title_paragraph: paragraphData.title_paragraph,
                priority: paragraphData.priority,
                clauseParagraph: paragraphData.clauseParagraph.map((clauseData) => ({
                    key: clauseData.key,
                    value: clauseData.value,
                    type: clauseData.type
                }))
            }))
        });
        if (!createContract) {
            return res.status(404).json({
                success: false,
                msg: "Not create Contract of model"
            });
        }
        ;
        return res.status(201).json({
            success: true,
            data: createContract._id,
            msg: "Successfully create contract_v1"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error " + " " + err.message
        });
    }
    ;
});
exports.createContract_1 = createContract_1;
// read contract-1 of model 
const readContract_1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //req.params
        const contractId = req.params.contractId;
        // aggregation pipeline with nested Array 
        const readContract = yield contract_1_1.Contract_1.aggregate([
            {
                $match: { _id: new mongoose_1.Types.ObjectId(contractId) }
            },
            {
                $unwind: "$paragraphs"
            },
            {
                $unwind: "$paragraphs.clauseParagraph"
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    description: { $first: "$description" },
                    typeContract: { $first: "$typeContract" },
                    price: { $first: "$price" },
                    paragraphs: {
                        $push: {
                            title_paragraph: "$paragraphs.title_paragraph",
                            priority: "$paragraphs.priority",
                            clauseParagraph: {
                                key: "$paragraphs.clauseParagraph.key",
                                value: "$clauseParagraphValue",
                                type: "$paragraphs.clauseParagraph.type"
                            }
                        }
                    }
                }
            },
        ]);
        if (!readContract) {
            return res.status(404).json({
                success: false,
                data: 'Error Not Found Contract_1 with ID'
            });
        }
        ;
        return res.status(200).json({
            success: true,
            data: readContract,
            msg: "Successfully read Contract_1"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + "&&" + err.message
        });
    }
    ;
});
exports.readContract_1 = readContract_1;
// update contract with contractId
const updateContract_1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId } = req.params;
        const { title, description, typeContract, price, paragraphs } = req.body;
        // update contract
        const updateContract = yield contract_1_1.Contract_1.findByIdAndUpdate(contractId, {
            title,
            description,
            typeContract,
            price,
            paragraphs: paragraphs.map((paragraphData) => ({
                title_paragraph: paragraphData.title_paragraph,
                priority: paragraphData.priority,
                clauseParagraph: paragraphData.clauseParagraph.map((clauseData) => ({
                    key: clauseData.key,
                    value: clauseData.value,
                    type: clauseData.type
                }))
            }))
        }, {
            new: true
        });
        if (!updateContract) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found contract data for update"
            });
        }
        ;
        return res.status(200).json({
            success: true,
            data: updateContract._id,
            msg: "Successfully update contract_1"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error " + "&&" + err.message
        });
    }
    ;
});
exports.updateContract_1 = updateContract_1;
// delete contract with nested array
const deleteContract_1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ContractId, elementId } = req.params;
        const deleteContract = yield contract_1_1.Contract_1.findOneAndUpdate({
            _id: ContractId
        }, { $pull: { 'paragraphs.$[].clauseParagraph': { _id: { $in: elementId } } } }, {
            new: true
        });
        if (deleteContract) {
            return res.status(200).json({
                success: true,
                msg: "successfully delete contract"
            });
        }
        ;
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + "&&" + err.message
        });
    }
});
exports.deleteContract_1 = deleteContract_1;
