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
exports.authEmployeeMiddleware = exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = exports.JWT_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const ms_1 = __importDefault(require("ms"));
// Load environment variables from .env file
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../../../uplaw_contract/.env') });
// Set JWT secret and access token expiration time from environment variables
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
;
// Middleware function for authorizing employee access
const authEmployeeMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get the Authorization header and remove the "Bearer " prefix
        const authHeader = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        // Return 401 error if Authorization header is missing or invalid
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                msg: "Not authorized to access heder"
            });
        }
        ;
        // Verify the JWT access token and decode its payload
        const decodedToken = jsonwebtoken_1.default.verify(authHeader, exports.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                msg: "Not authorized to access this resource"
            });
        }
        ;
        // Check if the JWT access token has expired
        const expireTimeAccessToken = (0, ms_1.default)(exports.JWT_ACCESS_TOKEN_EXPIRATION_TIME || '0');
        const currentTimeInMs = Date.now();
        const tokenExpirationTimeInMs = decodedToken.exp * 1000;
        // Log the current time
        const now = new Date();
        const time = now.toLocaleString();
        console.log(`AccessToken checked at ${time}`);
        if (currentTimeInMs > tokenExpirationTimeInMs + expireTimeAccessToken) {
            return res.status(401).json({
                success: false,
                msg: "Access token has expired"
            });
        }
        ;
        // Set the employee field in the request object and call the next middleware function
        req.employee = decodedToken._id;
        return next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error:${err.message}`
        });
    }
    ;
});
exports.authEmployeeMiddleware = authEmployeeMiddleware;
