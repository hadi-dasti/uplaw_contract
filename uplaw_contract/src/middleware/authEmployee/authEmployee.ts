import { Request, Response, NextFunction } from "express";
import jwt,{ Secret } from 'jsonwebtoken';
import { join } from 'path';
import dotenv from 'dotenv';

// setup join path as dotenv of JWT_SECRETE
dotenv.config({ path: join(__dirname, '../../../../uplaw_contract/.env') });
export const JWT_SECRETE = process.env.JWT_SECRETE;

interface AuthRequest extends Request {
  user?:any;
};

// setup middleware function for authorization employee
export const authEmployee = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Not authorized to access this resource"
            })
        }

        const decoded = jwt.verify(token, JWT_SECRETE as Secret);
        req.user = decoded
        if (!decoded) {
            return res.status(401).json({
                success: false,
                nsg: "Not authorized to access this resource"
            })
        };
        return next()

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + ";" + error.message
        });
    }
};