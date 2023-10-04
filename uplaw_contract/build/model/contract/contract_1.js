"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract_1 = exports.contractSchema = exports.paragraphSchema = exports.clauseParagraphSchema = void 0;
const mongoose_1 = require("mongoose");
;
;
;
//build schema embedded of clause in paragraph
exports.clauseParagraphSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    value: { type: mongoose_1.Schema.Types.Mixed, default: "" },
    type: { type: String, enum: ["SELECT", "QA", "TEXT", "TABLE", "BLANK SPACE"] },
});
//build schema embedded of paragraph in contract_1
exports.paragraphSchema = new mongoose_1.Schema({
    title_paragraph: { type: String, required: [true, 'please  provide a title paragraph'] },
    priority: { type: Number, default: 0 },
    clauseParagraph: { type: [exports.clauseParagraphSchema], default: [] }
});
// build schema of contract_1
exports.contractSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, 'please provide a title contract'] },
    description: { type: String, required: [true, 'please provide a description contract'] },
    typeContract: { type: String, required: [true, 'please provide a  typeContract '] },
    price: { type: String, required: [true, 'please provide a price contract'] },
    paragraphs: { type: [exports.paragraphSchema], default: [] },
    acceptedContract: { type: mongoose_1.Schema.Types.ObjectId, ref: 'AcceptContract' }
}, {
    timestamps: true
});
// build model of contractSchema
exports.Contract_1 = (0, mongoose_1.model)('Contract_1', exports.contractSchema);
