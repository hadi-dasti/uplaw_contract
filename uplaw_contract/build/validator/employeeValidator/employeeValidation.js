"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPasswordEmployee = exports.validateForgetPasswordEmployee = exports.validateVerifyEmployee = exports.validateLoginEmployee = exports.validateRegisterEmployee = void 0;
const joi_1 = __importDefault(require("joi"));
// Define validate gender
var Gender;
(function (Gender) {
    Gender["Male"] = "MALE";
    Gender["Female"] = "FEMALE";
})(Gender || (Gender = {}));
// Define the Joi schema for validating the request body of register employee
const validateRegisterEmployee = (req, res, next) => {
    //req.body of register employee
    const employeeSchema = joi_1.default.object({
        firstName: joi_1.default.string().alphanum().min(3).max(10).required().messages({
            'string.alphanum': 'First name must only contain alpha-numeric characters',
            'string.min': 'First name must be at least {{#limit}} characters long',
            'string.max': 'First name cannot be longer than {{#limit}} characters',
            'any.required': 'First name is required'
        }),
        lastName: joi_1.default.string().trim().min(2).max(20).required().messages({
            'string.min': 'Last name must be at least {{#limit}} characters long',
            'string.max': 'Last name cannot be longer than {{#limit}} characters',
            'any.required': 'Last name is required'
        }),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters and contain only alpha-numeric characters'
        }),
        address: joi_1.default.string().min(10).trim().required().messages({
            'string.min': 'Address must be at least {{#limit}} characters long',
            'any.required': 'Address is required'
        }),
        email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        age: joi_1.default.number().min(18).max(60).integer().required().messages({
            'number.min': 'Age must be at least {{#limit}} years old',
            'number.max': 'Age cannot be older than {{#limit}} years old',
            'number.integer': 'Age must be an integer',
            'any.required': 'Age is required',
        }),
        nationalCode: joi_1.default.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'National code must be exactly 10 digits',
            'any.required': 'National code is required'
        }),
        numberMobile: joi_1.default.string().pattern(/^[0-9]{11}$/).required().messages({
            'string.pattern.base': 'Mobile number must be exactly 11 digits',
            'any.required': 'Mobile number is required'
        }),
        gender: joi_1.default.string().valid(...Object.values(Gender)).required().messages({
            'any.only': 'Please provide a valid gender',
            'any.required': 'Gender is required',
        }),
        isActive: joi_1.default.boolean().required().messages({
            'any.required': 'Please specify if the user is active or not'
        }),
        mobileOtp: joi_1.default.string().pattern(/^[0-9]{6}$/).optional().messages({
            'string.pattern.base': 'Mobile OTP must be exactly 6 digits'
        }),
        createAt: joi_1.default.date().default(new Date()).messages({
            'date.base': 'Please provide a valid date'
        }),
        profileImage: joi_1.default.string().optional().messages({
            'any.required': 'Please provide a profile image'
        }),
    });
    // define handel error for req.body of register employee
    try {
        const { error } = employeeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                messages: errors.join(',')
            });
        }
        return next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: ['Internal Server Error', err.name]
        });
    }
};
exports.validateRegisterEmployee = validateRegisterEmployee;
// Define the Joi schema for validating the request body of login employee
const validateLoginEmployee = (req, res, next) => {
    //req.body of login employee
    const employeeSchemaLogin = joi_1.default.object({
        email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters and contain only alpha-numeric characters'
        }),
    });
    // define handel error for req.body of login employee
    try {
        const { error } = employeeSchemaLogin.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                messages: errors.join(',')
            });
        }
        return next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: ['Internal Server Error', err.name]
        });
    }
};
exports.validateLoginEmployee = validateLoginEmployee;
// Define the joi schema for validating the request body of verify login employee
const validateVerifyEmployee = (req, res, next) => {
    //req.body of verify login employee
    const schemaValidate = joi_1.default.object({
        employeeId: joi_1.default.string().required().messages({
            'string.base': 'Employee ID must be a string',
            'string.empty': 'Employee ID is required',
        }),
        otp: joi_1.default.string().length(6).required().messages({
            'string.base': 'OTP must be a string',
            'string.empty': 'OTP is Empty',
        })
    });
    // define handel error for req.body of login employee
    try {
        const { error } = schemaValidate.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                messages: errors.join(',')
            });
        }
        return next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            msg: ["Internal Server Error", err.message]
        });
    }
};
exports.validateVerifyEmployee = validateVerifyEmployee;
// Define the joi Schema for validation request body of forget password employee
const validateForgetPasswordEmployee = (req, res, next) => {
    // request body of forget password
    const employeeForgetSchema = joi_1.default.object({
        nationalCode: joi_1.default.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'National code must be exactly 10 digits',
            'any.required': 'National code is required'
        }),
    });
    //handling error 
    try {
        const { error } = employeeForgetSchema.validate(req.body, { abortEarly: true });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                msg: errors.join(',')
            });
        }
        return next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};
exports.validateForgetPasswordEmployee = validateForgetPasswordEmployee;
// Define validation for reset password of employee
const validateResetPasswordEmployee = (req, res, next) => {
    // request body  for reset Password
    const validateSchemaEmployee = joi_1.default.object({
        employeeId: joi_1.default.string().alphanum().length(24).required().messages({
            'string.base': 'employeeId must be a string',
            'string.alphaNum': 'employeeId must only contain alphanumeric characters',
            'string.length': 'employeeId must be exactly 24 characters long',
            'any.required': 'employeeId is required'
        }),
        lastFourDigits: joi_1.default.string().length(4).pattern(/^\d+$/).required().messages({
            'string.base': 'Last four digits must be a string',
            'string.length': 'Last four digits must be exactly 4 characters long',
            'string.pattern.base': 'Last four digits must only contain numeric characters',
            'any.required': 'Last four digits are required',
        }),
    });
    // handle error for response
    try {
        const { error } = validateSchemaEmployee.validate(req.body, { abortEarly: true });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                msg: errors.join(',')
            });
        }
        return next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};
exports.validateResetPasswordEmployee = validateResetPasswordEmployee;
