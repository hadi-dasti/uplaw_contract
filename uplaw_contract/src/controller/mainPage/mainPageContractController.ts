import { Request,Response } from "express"

// create main page of application
export const viewContractPageController = (req:Request,res:Response) => {
    return res.status(200).json({
        success: true,
        data: `<h1> view page application</h1>`,
        msg : 'start view page application'
    })
}