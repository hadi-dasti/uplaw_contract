import { Request, Response, NextFunction } from "express";
import { Employee } from '../../model/Employee/Employee';


        // Middleware function to check if a user is authenticated with Google and has a corresponding employee document in the database
export const authAccountGoogleEmployee = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        // Retrieve the authenticated employee from the request object
        const employee = req.user;
        // If there is no authenticated employee, return a 401 Unauthorized response
    if (!employee) {
        return res.status(401).send('Unauthorized')
    }
        const newEmployee = await Employee.findOne(employee)

        // Query the database for an employee document that matches the authenticated employee's _id field
    if (!newEmployee?.googleId && !newEmployee) {
        return res.status(401).send('Unauthorized')
    }

        return next()
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg : "Internal Server Errro"
        })
    }  
};