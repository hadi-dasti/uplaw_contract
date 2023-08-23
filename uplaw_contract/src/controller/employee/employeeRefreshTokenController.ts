import { Request, Response } from "express";
import { Employee, IEmployee } from '../../model/Employee/Employee';
import jwt, { Secret } from 'jsonwebtoken';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../../../uplaw_contract/.env') });

// Set JWT secret and access token expiration time from environment variables
export const JWT_SECRET = process.env.JWT_SECRET as Secret;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;



export const employeeRefreshTokenController = async (req: Request<{ emplyeeId: string }>, res: Response) => {
    
    const { refreshToken, emplyeeId } = req.body;

    try {
//* check employee with id in document         
        const checkEmployeeId = await Employee.findById({ _id: emplyeeId });

        if (!checkEmployeeId) {
            return res.status(404).json({
                success: false,
                msg: "Error not Found employeeId"
            });
        }

//* Verify the refreshToken
        const checkRefreshToken = jwt.verify(refreshToken as string, JWT_SECRET as Secret) as { employeeId: string };

        if (!checkRefreshToken) {
            return res.status(401).json({
                success: false,
                msg: "Failuer to verify refreshToken"
            });
        }

//* create new accesstoken
        const newAcceessToken = jwt.sign({ employeeId: emplyeeId },
            JWT_SECRET as Secret,
            { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME });
        const now = new Date();
        const date = now.toLocaleString();
        console.log(`generate new accessToken in ${date}`);

//* create new refreshToken
        const newRefreshToken = jwt.sign({ employeeId: emplyeeId },
            JWT_SECRET as Secret,
            { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME });
        
        if (!newAcceessToken || !newRefreshToken) {
            return res.status(400).json({
                success: false,
                msg: "Error for generate token"
            });
        }


//* save New refresh token in document
        checkEmployeeId.refreshToken = newRefreshToken;
        await checkEmployeeId.save();

        return res.status(200).json({
            success: true,
            newAcceessToken,
            newRefreshToken,
            msg: "successfully generate newAccessToken and newREfreshToken"
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error : ${err.message}`
        });
    };
};


