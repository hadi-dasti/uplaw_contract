import { Request, Response } from "express";
import { AcceptContract } from '../../model/AcceptContract/AcceptContractEmployee';
import { Admin, IAdmin } from '../../model/Admin/AdminSite';
import { Employee, IEmployee } from '../../model/Employee/Employee';
import { Contract_1, IContract_1 } from '../../model/contract/contract_1';


// handel acceptContract 
export const finalAcceptContractController = async (req: Request, res: Response) => {
    try {
        const { employeeId} = req.params;
        const { adminId,contractId } = req.body;
        
        // create document of model acceptContract with employee and contract
        const newAcceptContract = await AcceptContract.create({
            employeeId,
            contractId,
            adminId
        });

        if (!newAcceptContract) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found"
            });
        };

        // push acceptContractId on admin document
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId,
            {
                $push: { acceptContract: newAcceptContract._id }
            },
            {
                new: true
            });
           
        if (!updatedAdmin) {
            return res.status(404).json({
                success: false,
                msg: "Error Not update Admin"
            });
        };

        // push acceptContractId on employee document
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId,
            {
                $push: { acceptedContract: newAcceptContract._id }
            },
            {
                new: true
            });
       
        if (!updatedEmployee) {
            return res.status(404).json({
                success: false,
                msg: "Error Not update Employee"
            });
        };

        // push acceptContractId to contract_1
        const updateContract_1 = await Contract_1.findByIdAndUpdate(contractId,
            {
                $push: { acceptedContract: newAcceptContract._id }
            },
            {
            new: true
            });
        
        if (!updateContract_1) {
            return res.status(404).json({
                success: false,
                msg: "Error not updated Contract_1"
            });
        };

        return res.status(201).json({
            success: true,
            data: newAcceptContract._id,
            msg: "successfully create AcceptContract"
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error in finalAcceptContractController : ${err.message}`
        });
    };
};

// read contract 
export const getAllContractController = async (req: Request, res: Response) => {
    try {
        const getAllContract = await AcceptContract.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "acceptedContract",
                    foreignField: "employeeId",
                    as: "employee"
                }
            },
            {
                $unwind: "$employee"
            },
            {
                $lookup: {
                    from: "contract_1",
                    localField: "acceptedContract",
                    foreignField: "contractId",
                    as: "contract_1"
                }
            },
            {
                $unwind: "$contract_1"
            },
            {
                $lookup: {
                    from: "admins",
                    localField: "acceptedContract",
                    foreignField: "adminId",
                    as: "admin"
                }
            },
            {
                $unwind: "$admin"
            },
            {
                $project: {
                    "__v": 0,
                    "employeeId": 0,
                    "contractId": 0,
                    "adminId": 0,
                    "employee.__v": 0,
                    "employee.updatedAt": 0,
                    "employee.mobileOtp": 0,
                    "employee.acceptedContract": 0,
                    "employee.verificationCodeSentAt":0,
                    "contract_1.__v": 0,
                    "contract_1.updatedAt": 0,
                    "contract_1.acceptedContract": 0,
                    "admin.__v": 0,
                    "admin.acceptContract": 0,
                    "admin.updatedAt": 0,
                }
            }
        ]);

        if (!getAllContract) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found AcceptContract"
            });
        };

        return res.status(200).json({
            success: true,
            data: getAllContract,
            msg: "Successfully create get all acceptContract"
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: `Internal Server Error in getAllContractController : ${err.message}`
        });
    };
};