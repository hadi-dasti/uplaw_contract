"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewContractPageController = void 0;
// create main page of application
const viewContractPageController = (req, res) => {
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
        }
        ;
        return res.status(200).render('../../views/contract.ejs', data);
    }
    catch (error) {
        console.log(`Internal Server Error : ${error.message}`);
    }
    ;
};
exports.viewContractPageController = viewContractPageController;
