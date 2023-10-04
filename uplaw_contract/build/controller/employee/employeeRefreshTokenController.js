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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRefreshTokenController = exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME = exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = exports.JWT_SECRET = void 0;
const Employee_1 = require("../../model/Employee/Employee");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../../uplaw_contract/.env') });
// Set JWT secret and access token expiration time from environment variables
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;
const employeeRefreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, emplyeeId } = req.body;
    try {
        //* check employee with id in document         
        const checkEmployeeId = yield Employee_1.Employee.findById({ _id: emplyeeId });
        if (!checkEmployeeId) {
            return res.status(404).json({
                success: false,
                msg: "Error not Found employeeId"
            });
        }
        //* Verify the refreshToken
        const checkRefreshToken = jsonwebtoken_1.default.verify(refreshToken, exports.JWT_SECRET);
        if (!checkRefreshToken) {
            return res.status(401).json({
                success: false,
                msg: "Failuer to verify refreshToken"
            });
        }
        //* create new accesstoken
        const newAcceessToken = jsonwebtoken_1.default.sign({ employeeId: emplyeeId }, exports.JWT_SECRET, { expiresIn: exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME });
        const now = new Date();
        const date = now.toLocaleString();
        console.log(`generate new accessToken in ${date}`);
        //* create new refreshToken
        const newRefreshToken = jsonwebtoken_1.default.sign({ employeeId: emplyeeId }, exports.JWT_SECRET, { expiresIn: exports.JWT_REFRESH_TOKEN_EXPIRATION_TIME });
        if (!newAcceessToken || !newRefreshToken) {
            return res.status(400).json({
                success: false,
                msg: "Error for generate token"
            });
        }
        //* save New refresh token in document
        checkEmployeeId.refreshToken = newRefreshToken;
        yield checkEmployeeId.save();
        return res.status(200).json({
            success: true,
            newAcceessToken,
            newRefreshToken,
            msg: "successfully generate newAccessToken and newREfreshToken"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error : ${err.message}`
        });
    }
    ;
});
exports.employeeRefreshTokenController = employeeRefreshTokenController;
