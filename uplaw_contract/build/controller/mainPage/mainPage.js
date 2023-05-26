"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewContractPage = void 0;
// create main page of application
const viewContractPage = (req, res) => {
    return res.status(200).json({
        success: true,
        data: `<h1> view page application</h1>`,
        msg: 'start view page application'
    });
};
exports.viewContractPage = viewContractPage;
