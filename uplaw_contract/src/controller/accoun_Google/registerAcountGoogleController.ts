import { Request, Response } from "express";
import { Employee }  from '../../model/Employee/Employee';


export class RegisterAccountGoogleController{
    
    public async handleGoogleRedirect(req: Request, res: Response) {
        
        try {
            // Check if there is an employee with a Google ID
            const checkAccountGoogle = await Employee.findOne({});
            
            if (!checkAccountGoogle) {
                return res.status(404).send({
                    success: false,
                    msg: 'Error Not Found googleId'
                });
            } 
          

        // Generate access token and refresh token for the employee
            const getAccessToken = checkAccountGoogle.generateAccessTokenEmployee();
            const getRefreshToken = checkAccountGoogle.generateRefreshTokenEmployee();
            
        // Update the employee's refresh token in the database
            checkAccountGoogle.refreshToken = getRefreshToken;
            await checkAccountGoogle.save();
            
        // Check if access token and refresh token were successfully generated
        if (!getAccessToken || !getRefreshToken) {
            return res.status(400).send({
                success: false,
                msg: 'Filed to build accessToken and refreshToken for employee'
            });
            }
            
            // Return the employee's ID, access token, and refresh token
        return res.status(200).json({
            success: true,
            data: {
                checkGoogleId:checkAccountGoogle._id,
                getAccessToken,
                getRefreshToken
            },
            msg: "successfully bulid regsiter new Employee with account_google and response accseesToken and  refreshToken"
        });
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                succsess: false,
                msg: "Internal Server Error"
            });
        };     
    };
};