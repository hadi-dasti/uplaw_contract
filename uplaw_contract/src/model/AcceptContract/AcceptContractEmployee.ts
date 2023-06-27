import { Schema, Document, model } from 'mongoose';


// interface acceptContract 
export interface IAcceptContract extends Document {
    employeeId: string,
    contractId: string,
    adminId:string
};

//build schema for acceptContract
export const acceptContractSchema = new Schema<IAcceptContract>({
    employeeId: { type: String, required: [true, 'Please provide an employeeId'] },
    contractId: { type: String, required: [true, 'Please provide a contractId'] },
    adminId: { type: String, required: [true, 'please provide a adminId'] }
});

//build model of schema acceptContract
export const AcceptContract = model<IAcceptContract>('AcceptContract', acceptContractSchema);