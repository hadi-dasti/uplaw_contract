import { Request, Response } from "express";





// create main page of application
export const viewContractPageController = (req: Request, res: Response) => {
    const data = {
        title: 'My Contract Home Page',
        message: 'Welcome to My Contract '
    };
    try {

        if (!data) {
            return res.status(400).send({
                success: false,
                msg: "Bad Request for get data"
            });
        };

        return res.status(200).render('../../views/contract.ejs', data);

    } catch (error: any) {
        console.log(`Internal Server Error : ${error.message}`);
    };   
};






