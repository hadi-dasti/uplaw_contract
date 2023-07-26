import {Request,Response } from 'express';
import { aboutMe ,About_me} from '../../model/About_me/aboutMe';


export class AboutMeController {
    // Initialize aboutMe to null
    private aboutMe: About_me | null = null;

    // Create aboutMe object
    public createAboutMe(req:Request,res:Response):Response {
        const { companyName, companyEmail, phoneNumber, mobileNumber, address, socialMedia } = req.body;

         // Check if required fields are present
         if (!companyName || !companyEmail || !phoneNumber || !mobileNumber || !address || !socialMedia) {
            
            res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        };
            // Create aboutMe object using request body
             this.aboutMe = {
            companyName,
            companyEmail,
            phoneNumber,
            mobileNumber,
            address,
            socialMedia 
        };
             // Return success response with newly created aboutMe object
            return res.status(201).json({
                success: true,
                data: aboutMe,
                msg: "About me created"
            });       
    };
     // Get aboutMe object
    public getAboutMe(req: Request, res: Response): Response {
        
        try {
             // Check if aboutMe object exists
            if (!this.aboutMe) {
            return res.status(404).json({
                success: false,
                msg: "About me not found"
            });
        };
         // Return success response with aboutMe object
        return res.status(200).json({
            success: true,
            data: this.aboutMe,
            msg: "About me retrieved"
        });
            
        } catch (error: any) {
            // Return error response for any unexpected errors
            return res.status(500).json({
                success: false,
                msg: `internal Server Error:${error.message}`
            });
        };      
    };  
};