import {Request,Response,NextFunction } from 'express'
import Joi from 'joi'


// define validation for request body of admin
export const adminValidation = (req: Request, res: Response, next: NextFunction) => {
    // define req.body
    const adminValidateData = Joi.object({
        fullName: Joi.string().min(3).max(30).required().messages({
            'string.base': `"fullName" should be a type of 'text'`,
            'string.empty': `"fullName" cannot be an empty field`,
            'string.min': `"fullName" should have a minimum length of {3}`,
            'string.max': `"fullName" should have a maximum length of {30}`,
            'any.required': `"fullName" is a required field`
        }),
        email: Joi.string().email().required().messages({
             'string.base': `"email" should be a type of 'text'`,
             'string.empty': `"email" cannot be an empty field`,
             'string.email': `"email" should be a valid email`,
             'any.required': `"email" is a required field`
        }),
        password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
            'string.pattern.base': 'Password must be between 8 and 30 characters and contain only alpha-numeric characters'
        }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
             'any.only': 'Confirm password must match password',
             'any.required': 'Confirm password is required'
        }),
        position: Joi.string().required().messages({
            'any.required': 'Position is required'
        }),
        mobileNumber: Joi.string().min(11).required().messages({
            'string.min': 'Mobile number must be at least 11 digits long',
            'any.required': 'Mobile number is required'
        })
    });
    // handle Error  request body of admin
    try {

        const { error } = adminValidateData.validate(req.body, { abortEarly: true });
        if (error) {
            const errors = error.details.map(detail => detail.message)
            return res.status(400).json({
                success: false,
                msg: errors.join(',')
            });
        };

        return next();

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg : 'Internal Server Error'+ err.message
        })
    }
};