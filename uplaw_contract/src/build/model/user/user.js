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
exports.User = exports.userSchema = exports.JWT_SECRETE = void 0;
const mongoose_1 = require("mongoose");
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// setup join path as dotenv
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../../../uplaw_contract/.env') });
exports.JWT_SECRETE = process.env.JWT_SECRETE;
// Create a Schema corresponding to the document interface
exports.userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, 'please provide a firstName'] },
    lastName: { type: String, required: [true, 'please provide a lastName'] },
    password: { type: String, required: [true, 'please provide a password'] },
    address: { type: String, minlength: 10, required: [true, 'please provide a address'] },
    email: { type: String, unique: true, required: [true, 'please provide a email'] },
    age: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 18 && value <= 60;
            },
            message: 'Age must be between 18 and 120'
        },
        required: [true, 'please provide a age']
    },
    nationalCode: { type: String, minlength: 9, unique: true, required: [true, 'please provide a nationalCode'] },
    numberMobile: { type: String, minlength: 11, required: [true, 'please provide a numberMobile'] },
    gender: { type: String, enum: ['MALE', 'FEMALE'], required: [true, 'please provide a gender'] },
    isActive: { type: Boolean, required: [true, 'please provide a isActive'] },
    mobileOtp: { type: String, required: false },
    createAt: { type: Date, default: Date.now },
    profileImage: { type: String, required: [false, 'please provide a profileImage'] },
    verificationCodeSentAt: { type: Date, default: Date.now, required: false }
}, {
    timestamps: true
});
// Hash the user's password before saving to the database
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        // hash password
        const salt = yield bcrypt.genSalt(10);
        user.password = yield bcrypt.hash(user.password, salt);
        next();
    });
});
// compare password
exports.userSchema.methods.isComparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
    });
};
// create toke 
exports.userSchema.methods.generateAuthEmployeeToken = function () {
    const token = jsonwebtoken_1.default.sign({ employeeId: this._id }, exports.JWT_SECRETE, { expiresIn: '24h' });
    return token;
};
//  Create a Model.
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
