import {Request,Response,NextFunction } from 'express'
import Joi from 'joi'

// Define validate gender
enum Gender {
    Male = 'MALE',
  Female = 'FEMALE',
}
   
// Define the Joi schema for validating the request body of register employee
export const validateRegisterEmployee = (req: Request, res: Response, next: NextFunction) => {
    //req.body of register employee
    const employeeSchema = Joi.object({
        firstName: Joi.string().alphanum().min(3).max(10).required().messages({
            'string.alphanum': 'First name must only contain alpha-numeric characters',
            'string.min': 'First name must be at least {{#limit}} characters long',
            'string.max': 'First name cannot be longer than {{#limit}} characters',
            'any.required': 'First name is required'
        }),
        lastName: Joi.string().trim().min(2).max(20).required().messages({
            'string.min': 'Last name must be at least {{#limit}} characters long',
            'string.max': 'Last name cannot be longer than {{#limit}} characters',
            'any.required': 'Last name is required'
        }),
        password: Joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({
            'string.pattern.base': 'Password must be between 8 and 30 characters and contain only alpha-numeric characters'
        }),
        address: Joi.string().min(10).trim().required().messages({
            'string.min': 'Address must be at least {{#limit}} characters long',
            'any.required': 'Address is required'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        age: Joi.number().min(18).max(60).integer().required().messages({
            'number.min': 'Age must be at least {{#limit}} years old',
            'number.max': 'Age cannot be older than {{#limit}} years old',
            'number.integer': 'Age must be an integer',
            'any.required': 'Age is required',
        }),
        nationalCode: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'National code must be exactly 10 digits',
            'any.required': 'National code is required'
        }),
        numberMobile: Joi.string().pattern(/^[0-9]{11}$/).required().messages({
            'string.pattern.base': 'Mobile number must be exactly 11 digits',
            'any.required': 'Mobile number is required'
        }),
        gender: Joi.string().valid(...Object.values(Gender)).required().messages({
            'any.only': 'Please provide a valid gender',
            'any.required': 'Gender is required',
        }),
        isActive: Joi.boolean().optional().messages({
            'any.required': 'Please specify if the user is active or not'
        }),
        mobileOtp: Joi.string().pattern(/^[0-9]{6}$/).optional().messages({
            'string.pattern.base': 'Mobile OTP must be exactly 6 digits'
        }),
        createAt: Joi.date().default(new Date()).messages({
            'date.base': 'Please provide a valid date'
        }),
        profileImage: Joi.string().optional().messages({
            'any.required': 'Please provide a profile image'
        }),
    })
     // define handel error for req.body of register employee
    try {
        const { error } = employeeSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(detail => detail.message)
            return res.status(400).json({
                success: false,
                messages : errors.join(',')
            })
        }

        return next()

    } catch (err : any) {
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'+ err.message
        })
    }
}

// Define the Joi schema for validating the request body of login employee
export const validateLoginEmployee = (req: Request, res: Response, next: NextFunction) => {
    //req.body of login employee
    const employeeSchemaLogin = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({
            'string.pattern.base': 'Password must be between 3 and 30 characters and contain only alpha-numeric characters'
        }),
        })
    // define handel error for req.body of login employee
    try {
        const { error } = employeeSchemaLogin.validate(req.body, { abortEarly: false }) 

        if (error) {
            const errors = error.details.map(detail => detail.message)
            return res.status(400).json({
                success: false,
                messages : errors.join(',')
            })
        }
        return next()

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg : ['Internal Server Error', err.name]
        })
    }
}

// Define the joi schema for validating the request body of verify login employee
export const validateVerifyEmployee = (req: Request, res: Response, next: NextFunction) => {
    //req.body of verify login employee
    const schemaValidate = Joi.object({
        employeeId: Joi.string().required().messages({
            'string.base': 'Employee ID must be a string',
            'string.empty': 'Employee ID is required', 
        }),
        otp: Joi.string().length(6).pattern(/^[0-9]{6}$/).required().messages({
            'string.base': 'OTP must be a string',
            'string.empty': 'OTP is Empty',
        })
    })
    // define handel error for req.body of login employee
    try {
        const { error } = schemaValidate.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(detail => detail.message)
            return res.status(400).json({
                success: false,
                messages : errors.join(',')
            })
        }
        return next()

    } catch (err:any) {
        return res.status(500).json({
            success: false,
            msg :["Internal Server Error",err.message]
        })
    }
}

// define the joi validation id for delete employee of application
export const validateDeleteIDEmployee = (req:Request,res:Response, next:NextFunction) => {
    const validateDeleteSchema = Joi.object({
        id: Joi.string().length(24).required().messages({
             'string.base': 'ID must be a string',
             'string.length': 'ID must be exactly 24 characters long',
             'any.required': 'ID is required'
        })
    })
    try {
        // handel Error id of request.params
        const { error } = validateDeleteSchema.validate(req.params,{ abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                success: false,
                msg : errors.join(',')
            })
        }
        return next()

    } catch (err:any) {
        return res.status(500).json({
            success: false,
            msg : "Internal Server Error"
        })
    }
}

// Define the joi Schema for validation request body of forget password employee
export const validateForgetPasswordEmployee = (req:Request, res:Response, next:NextFunction) => {
    // request body of forget password
    const employeeForgetSchema = Joi.object({
        nationalCode: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'National code must be exactly 10 digits',
            'any.required': 'National code is required'
        }),
    })
    //handling error 
    try {
        const { error }  = employeeForgetSchema.validate(req.body, { abortEarly: true })
        if (error) {
           const errors =  error.details.map(detail => detail.message)
            return res.status(400).json({
                success: false,
                msg : errors.join(',')
            })
        }

        return next()

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg : 'Internal Server Error'
       })
    }
} 

// Define validation for reset password of employee
export const validateResetPasswordEmployee = (req: Request, res: Response, next: NextFunction) => {
    // request body  for reset Password
    const validateSchemaEmployee = Joi.object({
        employeeId: Joi.string().alphanum().length(24).required().messages({
             'string.base': 'employeeId must be a string',
             'string.alphaNum': 'employeeId must only contain alphanumeric characters',
             'string.length': 'employeeId must be exactly 24 characters long',
             'any.required': 'employeeId is required'
        }),
        lastFourDigits:Joi.string().length(4).pattern(/^\d+$/).required().messages({
      'string.base': 'Last four digits must be a string',
      'string.length': 'Last four digits must be exactly 4 characters long',
      'string.pattern.base': 'Last four digits must only contain numeric characters',
      'any.required': 'Last four digits are required',
    }),
    })

    // handle error for response
    try {
        const { error } = validateSchemaEmployee.validate(req.body, { abortEarly: true })
        if (error) {
            const errors = error.details.map(detail => detail.message)
            return res.status(400).json({
                success: false,
                msg : errors.join(',')
            })
        }

        return next()

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg : "Internal Server Error"
        })
    }
}