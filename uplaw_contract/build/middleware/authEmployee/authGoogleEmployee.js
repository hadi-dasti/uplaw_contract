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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAccountGoogleEmployee = void 0;
const Employee_1 = require("../../model/Employee/Employee");
// Middleware function to check if a user is authenticated with Google and has a corresponding employee document in the database
const authAccountGoogleEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve the authenticated employee from the request object
        const employee = req.user;
        // If there is no authenticated employee, return a 401 Unauthorized response
        if (!employee) {
            return res.status(401).send('Unauthorized');
        }
        const newEmployee = yield Employee_1.Employee.findOne(employee);
        // Query the database for an employee document that matches the authenticated employee's _id field
        if (!(newEmployee === null || newEmployee === void 0 ? void 0 : newEmployee.googleId) && !newEmployee) {
            return res.status(401).send('Unauthorized');
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Errro"
        });
    }
});
exports.authAccountGoogleEmployee = authAccountGoogleEmployee;
