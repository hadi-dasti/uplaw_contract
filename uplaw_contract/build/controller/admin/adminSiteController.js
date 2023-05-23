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
exports.registerAdmin = void 0;
const AdminSite_1 = require("../../model/Admin/AdminSite");
// register admin in site
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, confirmPassword, position, mobileNumber } = req.body;
        // check fullName and email of database
        const duplicatedEmailAndMobileNumberAdmin = yield AdminSite_1.Admin.findOne({
            $or: [{
                    email,
                    mobileNumber
                }]
        }, {
            "_v": 0
        });
        if (duplicatedEmailAndMobileNumberAdmin) {
            return res.status(400).json({
                success: false,
                msg: 'The email and mobileNumber entered are duplicates. Please try again.'
            });
        }
        ;
        // match password and confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: 'Password mismatch error with similar confirmPassword'
            });
        }
        ;
        // create document Admin of model Admin
        const createAdmin = yield AdminSite_1.Admin.create({
            fullName,
            email,
            password,
            position,
            mobileNumber
        });
        // check save field of schemaModel in mongodb
        if (!createAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error not found "
            });
        }
        ;
        //get token for admin 
        const getTokenAdmin = createAdmin.generateTokenAdmin();
        return res.status(201).json({
            success: true,
            data: {
                getTokenAdmin,
                createAdmin: createAdmin._id
            },
            msg: "successfully create get token for admin"
        });
        // handel Error Exception
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error' + error.message
        });
    }
    ;
});
exports.registerAdmin = registerAdmin;
