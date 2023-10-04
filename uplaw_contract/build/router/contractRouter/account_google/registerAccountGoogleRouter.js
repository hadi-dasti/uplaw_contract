"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const registerAcountGoogleController_1 = require("./../../../controller/accoun_Google/registerAcountGoogleController");
const authGoogleEmployee_1 = require("../../../middleware/authEmployee/authGoogleEmployee");
//build router of instance Router Express
const router = (0, express_1.Router)();
// Create an instance of the RegisterAccountGoogleController class
const registerAccountGoogle = new registerAcountGoogleController_1.RegisterAccountGoogleController();
// Route for registering with Google
router.get('/register_google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Callback route after successful authentication with Google
router.get('/callbackUrl', passport_1.default.authenticate('google', { session: false, failureRedirect: '/api/v1/contract' }), authGoogleEmployee_1.authAccountGoogleEmployee, registerAccountGoogle.handleGoogleRedirect.bind(registerAccountGoogle));
exports.default = router;
