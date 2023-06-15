"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Setup Multer storage engine
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path_1.default.join(process.cwd(), './image'));
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
});
// Create Multer instance
const fileName = (req, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        return callback(null, true);
    }
    else {
        return callback(null, false);
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileName,
});
exports.default = upload;
