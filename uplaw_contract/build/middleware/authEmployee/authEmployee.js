"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authEmployee = exports.JWT_SECRETE = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
// setup join path as dotenv
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../../../uplaw_contract/.env') });
exports.JWT_SECRETE = process.env.JWT_SECRETE;
;
const authEmployee = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Not authorized to access this resource_part1"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.JWT_SECRETE);
        req.user = decoded;
        if (!decoded) {
            return res.status(401).json({
                success: false,
                nsg: "Not authorized to access this resource"
            });
        }
        ;
        return next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + ";" + error.message
        });
    }
};
exports.authEmployee = authEmployee;
