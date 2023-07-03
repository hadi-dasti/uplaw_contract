import { Request, Response } from 'express';
import { Contract_1, IContract_1,IClause,IParagraphs } from '../../model/contract/contract_1';
import { Types } from 'mongoose';



// build contract_1
export const createContract_1 = async (req: Request, res: Response) => {
    // request body of  model contract_1
    const { title,
        description,
        typeContract,
        price,
        paragraphs,
    } = req.body;

    try {
        const createContract: IContract_1 = await Contract_1.create({
            title,
            description,
            typeContract,
            price,
            paragraphs: paragraphs.map((paragraphData: IParagraphs) => ({
                title_paragraph: paragraphData.title_paragraph,
                priority: paragraphData.priority,
                clauseParagraph: paragraphData.clauseParagraph.map((clauseData: IClause) => ({
                    key: clauseData.key,
                    value: clauseData.value,
                    type: clauseData.type
                }))
            }))
        });

        if (!createContract) {
            return res.status(404).json({
                success: false,
                msg: "Not create Contract of model"
            })
        };
        
        return res.status(201).json({
            success: true,
            data: createContract._id,
            msg: "Successfully create contract_v1"
        });
        
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error " + " " + err.message
        })
    };
}

// read contract-1 of model 
export const readContract_1 = async (req: Request<{ contractId: string }>, res: Response) => {
    //req.params
    const { contractId } = req.params;

    try {
        
        // aggregation pipeline with nested Array 
        const readContract = await Contract_1.aggregate([
            {
                $match: { _id: new Types.ObjectId(contractId) }
            },
            {
                $unwind: "$paragraphs"
            },
            {
                $unwind: "$paragraphs.clauseParagraph"
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    description: { $first: "$description" },
                    typeContract: { $first: "$typeContract" },
                    price: { $first: "$price" },
                    paragraphs: {
                        $push: {
                            title_paragraph: "$paragraphs.title_paragraph",
                            priority: "$paragraphs.priority",
                            clauseParagraph: {
                                key: "$paragraphs.clauseParagraph.key",
                                value: "$clauseParagraphValue",
                                type: "$paragraphs.clauseParagraph.type"
                            }
                        }
                    }
                }
            },
        ]);

        if (!readContract) {
            return res.status(404).json({
                success: false,
                data: 'Error Not Found Contract_1 with ID'
            });
        };
    
        return res.status(200).json({
            success: true,
            data: readContract,
            msg: "Successfully read Contract_1"
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + "&&" + err.message
        });
    };
};

// update contract with contractId
export const updateContract_1 = async (req: Request, res: Response) => {
    try {
        const { contractId } = req.params;
        const { title, description, typeContract, price, paragraphs} = req.body;
        
        // update contract
        const updateContract: IContract_1 | null = await Contract_1.findByIdAndUpdate(contractId,
            {
            title,
            description,
            typeContract,
            price,
            paragraphs: paragraphs.map((paragraphData: IParagraphs) => ({
                title_paragraph: paragraphData.title_paragraph,
                priority: paragraphData.priority,
                clauseParagraph: paragraphData.clauseParagraph.map((clauseData: IClause) => ({
                    key: clauseData.key,
                    value: clauseData.value,
                    type: clauseData.type
                }))
            }))
            },
            {
                new:true
            }
        );

        if (!updateContract) {
            return res.status(404).json({
                success: false,
                msg: "Error Not Found contract data for update"
            });
        };

        return res.status(200).json({
            success: true,
            data: updateContract._id,
            msg : "Successfully update contract_1"
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error " + "&&" + err.message
        });
    };
};

// delete contract with nested array
export const deleteContract_1 = async(req:Request,res:Response) => {
    try {
        const { ContractId, elementId } = req.params;

        const deleteContract = await Contract_1.findOneAndUpdate({
            _id: ContractId
        },
            { $pull: { 'paragraphs.$[].clauseParagraph': { _id: { $in: elementId } } } }, {
                new : true
        });
        
        if (deleteContract) {
            return res.status(200).json({
                success: true,
                msg: "successfully delete contract"
            });
        };
        
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error" + "&&" + err.message
        });
    }
}

