"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationAdminId = exports.adminUpdateValidation = exports.adminValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// define validation for request body of admin
const adminValidation = (req, res, next) => {
    // define req.body
    const adminValidateData = joi_1.default.object({
        fullName: joi_1.default.string().min(3).max(30).required().messages({
            'string.base': `"fullName" should be a type of 'text'`,
            'string.empty': `"fullName" cannot be an empty field`,
            'string.min': `"fullName" should have a minimum length of {3}`,
            'string.max': `"fullName" should have a maximum length of {30}`,
            'any.required': `"fullName" is a required field`
        }),
        email: joi_1.default.string().email().required().messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.empty': `"email" cannot be an empty field`,
            'string.email': `"email" should be a valid email`,
            'any.required': `"email" is a required field`
        }),
        password: joi_1.default.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
            'string.pattern.base': 'Password must be between 8 and 30 characters and contain only alpha-numeric characters'
        }),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required().messages({
            'any.only': 'Confirm password must match password',
            'any.required': 'Confirm password is required'
        }),
        position: joi_1.default.string().required().messages({
            'any.required': 'Position is required'
        }),
        mobileNumber: joi_1.default.string().min(11).required().messages({
            'string.min': 'Mobile number must be at least 11 digits long',
            'any.required': 'Mobile number is required'
        })
    });
    // handle Error  request body of admin
    try {
        const { error } = adminValidateData.validate(req.body, { abortEarly: true });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                msg: errors.join(',')
            });
        }
        ;
        return next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error' + err.message
        });
    }
};
exports.adminValidation = adminValidation;
// define validation for req.body admin for update
const adminUpdateValidation = (req, res, next) => {
    //define request body admin with adminId
    const UpdateAdmin = joi_1.default.object().keys({
        fullName: joi_1.default.string().min(3).max(30).required().messages({
            'string.base': `"fullName" should be a type of 'text'`,
            'string.empty': `"fullName" cannot be an empty field`,
            'string.min': `"fullName" should have a minimum length of {3}`,
            'string.max': `"fullName" should have a maximum length of {30}`,
            'any.required': `"fullName" is a required field`
        }),
        email: joi_1.default.string().email().required().messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.empty': `"email" cannot be an empty field`,
            'string.email': `"email" should be a valid email`,
            'any.required': `"email" is a required field`
        }),
        password: joi_1.default.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
            'string.pattern.base': 'Password must be between 8 and 30 characters and contain only alpha-numeric characters'
        }),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required().messages({
            'any.only': 'Confirm password must match password',
            'any.required': 'Confirm password is required'
        }),
        position: joi_1.default.string().required().messages({
            'any.required': 'Position is required'
        }),
        mobileNumber: joi_1.default.string().min(11).required().messages({
            'string.min': 'Mobile number must be at least 11 digits long',
            'any.required': 'Mobile number is required'
        })
    });
    // handle Error  request body of update admin
    try {
        const { error } = UpdateAdmin.validate(req.body);
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                msg: errors.join(',')
            });
        }
        ;
        return next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error' + err.message
        });
    }
};
exports.adminUpdateValidation = adminUpdateValidation;
// define validation adminId
const validationAdminId = (req, res, next) => {
    //define id 
    const adminValidateId = joi_1.default.object({
        id: joi_1.default.string().length(24).required().messages({
            'string.base': 'ID must be a string',
            'string.length': 'ID must be exactly 24 characters long',
            'any.required': 'ID is required'
        })
    });
    // handle Error 
    try {
        const { error } = adminValidateId.validate(req.params, { abortEarly: true });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                msg: errors.join(',')
            });
        }
        ;
        return next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error' + err.message
        });
    }
};
exports.validationAdminId = validationAdminId;
