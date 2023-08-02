import { Request, Response } from "express";
import { Contact_us,send_Email_Contact_us} from "../../interface/contactUs";
import {Employee, IEmployee } from '../../model/Employee/Employee';
import { sendEmailOfEmployeeToApp} from '../../utile/sendEmail';




export class ContractUsController{
       
    private readonly contactUs: Contact_us = {
        OfficeContactNumber: "ddddddddddddd",
        OfficeَAddress: "ffffffffffffffffffffff"
    };
      

     private readonly email_link: send_Email_Contact_us = {
        email: "hadidasti98@gmail.com",    
    };

   
    // Handler for getting the contact us information
    public getContactUs(req: Request, res: Response):Response{
        
        if (!this.contactUs) {
            return res.status(404).json({
                success: false,
                msg: 'Error not found contact_us'
            });
        };

        return res.status(200).json({
            success: true,
            data: this.contactUs,
            msg: "successfully build contact_us"
        });
    };

    // Handler for getting the email link for an employee
    public async getLinkEmail(req: Request<{employeeId:string}>, res: Response){

        const { employeeId } = req.params;

        try {

            const employee: IEmployee | null = await Employee.findById({ _id: employeeId });
          
        if (!employee) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found"
            });
        };

            const emailLink = `mailto:${employee.email}`;
            this.email_link.email = emailLink
    
            return res.status(200).json({
                success: true,
                data: { emailLink },
                msg : "successfully build link to email "
          });

        } catch (err:any) {
            return res.status(500).json({
                success: false,
                msg: `Internal Server Error: ${err.message}`
            });
        };
        
    };
    // Handler for sending an email to the application
    public async sendEmailToApp(req: Request, res: Response) {
        const { email, message } = req.body;
        
        try {
        
            if (this.email_link.email !== email) { 
                return res.status(400).json({
                    success: false,
                    msg: "Error not match id for send email"
                });
            };

            await sendEmailOfEmployeeToApp(email, message);

            return res.status(200).json({
                success: true,
                data: `send ${message} with ${email}`,
                msg: "successfully send message to application"
            });

        } catch (err: any) {
            return res.status(500).json({
                success: false,
                msg: `Internal Server Error : ${err.name} `
            });
        };
    };
       
    // Handler for getting the Telegram join link for an employee
    public async getJoinTelegram(req: Request<{employeeId:string}>, res: Response):Promise<Response> {
        
        const { employeeId } = req.params;
        
        try {
            // Find the employee by their ID
            const employeeJoin : IEmployee | null = await Employee.findById({_id:employeeId})

            if (!employeeJoin) {
                return res.status(400).json({
                    success: false,
                    msg: 'Error Not Found '
                });
            };

            // Build the Telegram join link using the employee's Telegram username
            const telegramLink = `https://t.me/${employeeJoin.telegram_username}`;

            return res.status(200).json({
                success: true,
                data: {telegramLink},
                msg: "Successfully build link to join Telegram"
            });

        } catch (err: any) {
            return res.status(500).json({
                success: false,
                msg: `Internal Server Error : ${err.message}`
            });
        };

    };

};