"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.JWT_SECRETE_ADMIN = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// setup join path as dotenv
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../../../uplaw_contract/.env') });
exports.JWT_SECRETE_ADMIN = process.env.JWT_SECRETE_ADMIN;
//2. Create a SchemaAdmin corresponding to the document interface IAdmin.
const adminSchema = new mongoose_1.Schema({
    fullName: { type: String, minlength: (3), required: [true, 'please provide a fullName'] },
    email: { type: String, unique: true, required: [true, 'please provide an email'] },
    password: { type: String, unique: true, minlength: (8), required: [true, 'please provide a password'] },
    position: { type: String, required: [true, 'please provide a position'] },
    mobileNumber: { type: String, unique: true, minlength: (11), required: [true, 'please provide a mobileNumber'] }
}, {
    timestamps: true
});
// create middleware pre for save password before change password
adminSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = this;
        if (!admin.isModified('password')) {
            return next();
        }
        ;
        // hash password Admin 
        const hashPassword = yield bcrypt.hash(admin.password, 10);
        admin.password = hashPassword;
        return next();
    });
});
// create token for admin 
adminSchema.methods.generateTokenAdmin = function () {
    const token = jsonwebtoken_1.default.sign({ adminId: this._id.toString() }, exports.JWT_SECRETE_ADMIN, { expiresIn: '48h' });
    return token;
};
// 3. Create a Model of AdminSchema
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
