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
exports.Employee = exports.employeeSchema = exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME = exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = exports.JWT_SECRET = void 0;
const mongoose_1 = require("mongoose");
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// setup join path as dotenv
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../../../uplaw_contract/.env') });
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;
// Create a Schema corresponding to the document interface
exports.employeeSchema = new mongoose_1.Schema({
    firstName: { type: String, minlength: 3, maxlength: 10 },
    lastName: { type: String, minlength: 2, maxlength: 20 },
    password: { type: String, unique: false, indexes: 0, minlength: 8 },
    address: { type: String, minlength: 10, trim: true },
    email: { type: String, unique: true },
    googleId: { type: String, unique: true },
    age: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 18 && value <= 60;
            },
            message: 'Age must be between 18 and 60'
        },
    },
    nationalCode: { type: String, minlength: 9, unique: true },
    numberMobile: { type: String, minlength: 11 },
    gender: { type: String, enum: ['MALE', 'FEMALE'] },
    isActive: { type: Boolean, default: true },
    mobileOtp: { type: String },
    createAt: { type: Date, default: Date.now },
    profileImage: {
        type: String, validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png|gif)$/i.test(v);
            },
            message: 'Profile image must be a valid image file (jpg, jpeg, png, or gif).'
        }
    },
    verificationCodeSentAt: { type: Date, default: Date.now },
    refreshToken: { type: String },
    acceptedContract: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'AcceptContract' }],
}, {
    timestamps: true
});
// Hash the employee's password before saving to the database
exports.employeeSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const employee = this;
        if (!employee.isModified('password')) {
            return next();
        }
        // hash password
        const salt = yield bcrypt.genSalt(10);
        employee.password = yield bcrypt.hash(employee.password, salt);
        next();
    });
});
// compare password
exports.employeeSchema.methods.isComparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
    });
};
// Hash the employee's Google ID before saving to the database
exports.employeeSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const employee = this;
        if (!employee.isModified('googleId')) {
            return next();
        }
        //hash googleId
        const salt = yield bcrypt.genSalt(10);
        employee.googleId = yield bcrypt.hash(employee.googleId, salt);
        return next();
    });
});
// create accessToken for employee with employeeId
exports.employeeSchema.methods.generateAccessTokenEmployee = function () {
    const accessToken = jsonwebtoken_1.default.sign({ employeeId: this._id }, exports.JWT_SECRET, { expiresIn: exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME });
    const now = new Date();
    const timeNow = now.toLocaleString();
    console.log(`Access token generated at ${timeNow}`);
    return accessToken;
};
// create refreshToken for employee with employeeId
exports.employeeSchema.methods.generateRefreshTokenEmployee = function () {
    const refreshToken = jsonwebtoken_1.default.sign({ employeeId: this._id }, exports.JWT_SECRET, { expiresIn: exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME });
    return refreshToken;
};
//  Create a Model.
exports.Employee = (0, mongoose_1.model)('Employee', exports.employeeSchema);
