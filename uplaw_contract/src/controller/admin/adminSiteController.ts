import { Request, Response} from 'express'
import {Admin,IAdmin} from '../../model/Admin/AdminSite'

// register admin in site
export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const {
            fullName,
            email,
            password,
            confirmPassword,
            position,
            mobileNumber } = req.body;
        
        // check fullName and email of database
        const duplicatedEmailAndMobileNumberAdmin = await Admin.findOne({
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
            })
        };

        // match password and confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: 'Password mismatch error with similar confirmPassword'
            })
        };

        // create document Admin of model Admin
        const createAdmin: IAdmin = await Admin.create({
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
        };

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
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error' + error.message
        });
    };
};