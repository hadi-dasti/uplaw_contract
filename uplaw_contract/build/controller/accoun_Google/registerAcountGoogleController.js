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
exports.RegisterAccountGoogleController = void 0;
const Employee_1 = require("../../model/Employee/Employee");
class RegisterAccountGoogleController {
    handleGoogleRedirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if there is an employee with a Google ID
                const checkAccountGoogle = yield Employee_1.Employee.findOne({});
                if (!checkAccountGoogle) {
                    return res.status(404).send({
                        success: false,
                        msg: 'Error Not Found googleId'
                    });
                }
                // Generate access token and refresh token for the employee
                const getAccessToken = checkAccountGoogle.generateAccessTokenEmployee();
                const getRefreshToken = checkAccountGoogle.generateRefreshTokenEmployee();
                // Update the employee's refresh token in the database
                checkAccountGoogle.refreshToken = getRefreshToken;
                yield checkAccountGoogle.save();
                // Check if access token and refresh token were successfully generated
                if (!getAccessToken || !getRefreshToken) {
                    return res.status(400).send({
                        success: false,
                        msg: 'Filed to build accessToken and refreshToken for employee'
                    });
                }
                // Return the employee's ID, access token, and refresh token
                return res.status(200).json({
                    success: true,
                    data: {
                        checkGoogleId: checkAccountGoogle._id,
                        getAccessToken,
                        getRefreshToken
                    },
                    msg: "successfully bulid regsiter new Employee with account_google and response accseesToken and  refreshToken"
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    succsess: false,
                    msg: "Internal Server Error"
                });
            }
            ;
        });
    }
    ;
}
exports.RegisterAccountGoogleController = RegisterAccountGoogleController;
;
