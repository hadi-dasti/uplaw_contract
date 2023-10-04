"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutMeController = void 0;
const aboutMe_1 = require("../../interface/aboutMe");
class AboutMeController {
    constructor() {
        // Initialize aboutMe to null
        this.aboutMe = null;
    }
    // Create aboutMe object
    createAboutMe(req, res) {
        const { companyName, companyEmail, phoneNumber, mobileNumber, address, socialMedia } = req.body;
        // Check if required fields are present
        if (!companyName || !companyEmail || !phoneNumber || !mobileNumber || !address || !socialMedia) {
            res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }
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
            data: aboutMe_1.aboutMe,
            msg: "About me created"
        });
    }
    ;
    // Get aboutMe object
    getAboutMe(req, res) {
        try {
            // Check if aboutMe object exists
            if (!this.aboutMe) {
                return res.status(404).json({
                    success: false,
                    msg: "About me not found"
                });
            }
            ;
            // Return success response with aboutMe object
            return res.status(200).json({
                success: true,
                data: this.aboutMe,
                msg: "About me retrieved"
            });
        }
        catch (error) {
            // Return error response for any unexpected errors
            console.error(error);
            return res.status(500).json({
                success: false,
                msg: `internal Server Error:${error}`
            });
        }
        ;
    }
    ;
}
exports.AboutMeController = AboutMeController;
;
