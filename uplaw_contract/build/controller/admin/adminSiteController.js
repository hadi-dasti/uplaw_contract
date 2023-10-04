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
exports.deleteAdmin = exports.updateAdmin = exports.getAdmin = exports.registerAdmin = void 0;
const AdminSite_1 = require("../../model/Admin/AdminSite");
// register admin in site
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, confirmPassword, position, mobileNumber } = req.body;
        // check fullName and email of database
        const duplicatedEmailAndMobileNumberAdmin = yield AdminSite_1.Admin.findOne({
            $or: [{ email, mobileNumber }],
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
// get one admin with id 
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // search admin with id
    const id = req.params.id;
    try {
        const getAdmin = yield AdminSite_1.Admin.findById({ _id: id }, {
            __v: 0,
            _id: 1,
            createdAt: 0,
            updatedAt: 0
        });
        // get error not found
        if (!getAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found"
            });
        }
        return res.status(200).json({
            success: true,
            data: getAdmin._id,
            msg: "successfully get admin with id of database"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + " " + err.name
        });
    }
});
exports.getAdmin = getAdmin;
//update admin with id
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // search admin with id
        const id = req.params.id;
        // req.body of database
        const { fullName, email, password, confirmPassword, position, mobileNumber } = req.body;
        const updateAdmin = yield AdminSite_1.Admin.findByIdAndUpdate(id, {
            fullName,
            email,
            password,
            confirmPassword,
            position,
            mobileNumber
        }, {
            new: true
        });
        //get error not found
        if (!updateAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found for Update Admin"
            });
        }
        ;
        // get response data
        return res.status(200).json({
            success: true,
            data: updateAdmin.id,
            msg: `successfully update admin ${updateAdmin}`
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + err.message
        });
    }
    ;
});
exports.updateAdmin = updateAdmin;
// delete admin with id
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // cache header
        res.set('Cache-Control', 'public, max-age=3600');
        //search admin wit id
        const adminId = req.params.id;
        // create method delete
        const deleteAdmin = yield AdminSite_1.Admin.findByIdAndDelete(adminId).select('_id');
        // get error not found
        if (!deleteAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found ID Admin"
            });
        }
        ;
        // get response of database
        return res.status(200).json({
            success: true,
            msg: 'successfully delete admin with id'
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + err.message
        });
    }
    ;
});
exports.deleteAdmin = deleteAdmin;
