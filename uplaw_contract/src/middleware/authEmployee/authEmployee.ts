import express, { Request, Response, NextFunction } from "express";
import jwt,{ Secret } from 'jsonwebtoken';
import { join } from 'path';
import dotenv from 'dotenv';
import ms from 'ms';

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../../../../uplaw_contract/.env') });

// Set JWT secret and access token expiration time from environment variables
export const JWT_SECRET = process.env.JWT_SECRET as Secret;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;

// Define AuthRequest interface to include employee field
export interface AuthRequest extends Request {
   employee?: any;
};


// Middleware function for authorizing employee access
export const authEmployeeMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get the Authorization header and remove the "Bearer " prefix
        const authHeader = req.header('Authorization')?.replace('Bearer ', '');

        // Return 401 error if Authorization header is missing or invalid
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                msg: "Not authorized to access heder"
            });
        };

        // Verify the JWT access token and decode its payload
        const decodedToken = jwt.verify(authHeader as string, JWT_SECRET as Secret) as { _id: string, exp: number };

        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                msg: "Not authorized to access this resource"
            });
        };
       
        // Check if the JWT access token has expired
        const expireTimeAccessToken = ms(JWT_ACCESS_TOKEN_EXPIRATION_TIME || '0');
        const currentTimeInMs = Date.now();
        const tokenExpirationTimeInMs = decodedToken.exp * 1000;

         // Log the current time
        const now = new Date();
        const time = now.toLocaleString();
        console.log(`AccessToken checked at ${time}`);
        
        if (currentTimeInMs > tokenExpirationTimeInMs + expireTimeAccessToken) {
            return res.status(401).json({
                success: false,
                msg: "Access token has expired"
            });
        };

        
    
        // Set the employee field in the request object and call the next middleware function
        req.employee = decodedToken._id;
        
        return next()

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error:${err.message}`
        });
    };
};
