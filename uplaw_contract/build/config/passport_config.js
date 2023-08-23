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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const Employee_1 = require("../model/Employee/Employee");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
// Load environment variables from .env files
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, './../../.env') });
// Serialize the employee object
passport_1.default.serializeUser((employee, done) => {
    done(null, employee);
});
// Deserialize the employee object by its id
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield Employee_1.Employee.findById(id);
        done(null, employee);
    }
    catch (error) {
        done(error, null);
    }
}));
// Use Google OAuth2.0 strategy for authentication
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(profile);
    try {
        // Find the employee by their Google ID
        const existEmployee = yield Employee_1.Employee.findOne({ googleId: profile.id });
        if (existEmployee) {
            console.log('already profile id exist', existEmployee);
        }
        // Create a new employee if they don't exist
        const newEmployee = yield Employee_1.Employee.create({
            googleId: profile.id,
            email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value,
        });
        console.log('New employee created:', newEmployee);
        return done(null, newEmployee);
    }
    catch (error) {
        console.log(error);
        return done(error);
    }
    ;
})));
