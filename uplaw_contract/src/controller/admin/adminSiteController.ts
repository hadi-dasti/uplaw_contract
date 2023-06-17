import { Request, Response, response } from 'express';
import { Admin, IAdmin } from '../../model/Admin/AdminSite';

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
            $or: [{ email, mobileNumber }],
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

// get one admin with id 
export const getAdmin = async (req: Request<{ id: string }>, res: Response) => {
    // search admin with id
    const id = req.params.id;
    try {
        const getAdmin = await Admin.findById({_id: id },
            {
                __v: 0,
                _id: 1,
                createdAt: 0,
                updatedAt:0
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

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + " " + err.name
        });
    }
};

//update admin with id
export const updateAdmin = async (req: Request<{id:string}>, res: Response) => {
    try {
        // search admin with id
        const id = req.params.id;
        // req.body of database
        const { fullName,
            email,
            password,
            confirmPassword,
            position,
            mobileNumber } = req.body;
        
        const updateAdmin = await Admin.findByIdAndUpdate(id,
            {
                fullName,
                email,
                password,
                confirmPassword,
                position,
                mobileNumber
            },
            {
                new: true
            });
            //get error not found
        if (!updateAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found for Update Admin"
            });
        };
        // get response data
        return res.status(200).json({
            success: true,
            data: updateAdmin.id,
            msg: `successfully update admin ${updateAdmin}`
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + err.message
        });
    };
};

// delete admin with id
export const deleteAdmin = async(req:Request<{id:string}>, res:Response) => {
    try {
        // cache header
        res.set('Cache-Control', 'public, max-age=3600');

        //search admin wit id
        const adminId = req.params.id;

        // create method delete
        const deleteAdmin = await Admin.findByIdAndDelete(adminId).select('_id');

        // get error not found
        if (!deleteAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found ID Admin"
            });
        };
        // get response of database
        return res.status(200).json({
            success: true,
            msg: 'successfully delete admin with id'
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + err.message
        });
    };
}