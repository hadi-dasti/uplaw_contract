import { Request, Response } from "express";
import { AcceptContract } from '../../model/AcceptContract/AcceptContractEmployee';
import { Admin, IAdmin } from '../../model/Admin/AdminSite';
import { Employee, IEmployee } from '../../model/Employee/Employee';
import { Contract_1, IContract_1 } from '../../model/contract/contract_1';
import { Types } from "mongoose";


// handel acceptContract of employer
export const finalAcceptContractController = async (req: Request, res: Response) => {

    const { employeeId, contractId, acceptContract } = req.body;
      
    try {

        // build document on mongodb of model AcceptContract 
        const buildAcceptContract = await AcceptContract.create({
            employeeId,
            contractId,
            acceptContract
        });

        // handel Error build AcceptContract
        if (!buildAcceptContract) {
            return res.status(404).json({
                success: false,
                msg: "Error of NOt build document of model AcceptContract"
            });
        };

        // UPDATE EMPLOYEE AND SEND TO EMPLOYEE SCHEMA
        const updateEmployee = await Employee.findByIdAndUpdate(employeeId,
            {
                $push: {
                    acceptedContract: buildAcceptContract._id
                },
            }, {
            new: true
        });
        //handel Error updateEmployee
        if (!updateEmployee) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Update EmployeeId"
            });
        };

        return res.status(201).json({
            success: true,
            data: buildAcceptContract,
            msg: "Successfully build AcceptContract of employee"
        });

    } catch (error:any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error on AcceptContract : ${error.message} `
        });
    };
};

// get contract with aggregation pipeline
export const getAllContractController = async (req: Request, res: Response) => {
    // build data of one document
    const acceptContractId = new Types.ObjectId('649f82f3b12be8424843d442');
   
    try {
        const getFinalContractAccept = await AcceptContract.aggregate([
            {
                $match: {
                   _id : acceptContractId,
               }
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "acceptedContract",
                    foreignField:"employeeId",
                    as:"employee_doc"
                }
            },
            {
                $unwind:"$employee_doc"
            },
            {
                $lookup: {
                    from: "contract_1",
                    localField: "acceptedContract",
                    foreignField: "contractId",
                    as:"contract_doc"
                }
            },
            {
                $unwind:"$contract_doc"
            },
            {
                $project: {
                    "__v": 0,
                    "employeeId": 0,
                    "contractId": 0,
                    "employee_doc.verificationCodeSentAt":0,
                    "employee_doc.updatedAt":0,
                    "employee_doc.__v":0,
                    "employee_doc.mobileOtp":0,
                    "employee_doc.acceptedContract": 0,
                    "employee_doc.createAt": 0,
                    "employee_doc.password": 0,
                    "contract_doc.__v":0,
                    "contract_doc.acceptedContract":0,
                    "contract_doc.updatedAt":0,
                }
            },
            {
                $limit:1
            }
        ]);

        if (!getFinalContractAccept) {
            return res.status(404).json({
                success: false,
                msg: "Error not Found of finalAcceptContract"
            });
        };

        return res.status(200).json({
            success: true,
            data: getFinalContractAccept,
            msg: "Successfully  get FinalContractAccept"
        });
        
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error on getAcceptContract : ${error.message} `
        });
    };
};

 // handel send contractAccept to admin
export const sendAcceptContractController = async (req: Request, res: Response) => {
    const { acceptContractId, adminId } = req.body;
    
    try {

        const sendAcceptContract = new AcceptContract({
            acceptContractId
        });

        if (!sendAcceptContract) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found of acceptContractId"
            });
        };
        // send acceptContract 
        const updateAdmin = await Admin.findByIdAndUpdate(adminId, {
            $push: {
                finalAcceptContract: sendAcceptContract._id
            }
        }, {
            new: true
        });

        if (!updateAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not found for adminId"
            });
        };

        return res.status(201).json({
            success: true,
            msg: `successfully send finalContractAccept to ${adminId} of ${acceptContractId}`
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error of sendContractAccept : ${error.message}`
        });
    };
};

