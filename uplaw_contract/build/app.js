"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
// main router app
const mainContractRouter_1 = __importDefault(require("./router/mainContractRouter"));
// setup Express middleware
exports.app = (0, express_1.default)();
// Helmet middleware for security headers
exports.app.use((0, helmet_1.default)());
// Parse JSON request bodies
exports.app.use(express_1.default.json());
// Parse URL-encoded request bodies
exports.app.use(express_1.default.urlencoded({ extended: true }));
// Enable Cross-Origin Resource Sharing (CORS)
exports.app.use((0, cors_1.default)());
// Serve static files from the 'image' directory
exports.app.use('/image', express_1.default.static((0, path_1.join)(__dirname, 'image')));
// Set the view engine to EJS
exports.app.set('view engine', 'ejs');
// Set the views directory
exports.app.set('views', (0, path_1.join)(__dirname, 'views'));
// main router
exports.app.use('/api/v1', mainContractRouter_1.default);
// Initialize Passport for authentication
exports.app.use(passport_1.default.initialize());
exports.default = exports.app;
