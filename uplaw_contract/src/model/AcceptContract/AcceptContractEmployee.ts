import { Schema, Document, model } from 'mongoose';


// interface acceptContract 
export interface IAcceptContract extends Document {
    employeeId: string,
    contractId: string,
    acceptContract: boolean
};

//build schema for acceptContract
export const acceptContractSchema = new Schema<IAcceptContract>({
    employeeId: [{ type: String, required: [true, 'Please provide an employeeId'] }],
    contractId: [{ type: String, required: [true, 'Please provide a contractId'] }],
    acceptContract: {type:Boolean,default:false,required:[true,'Please provide a AcceptContract']}
});

//build model of schema acceptContract
export const AcceptContract = model<IAcceptContract>('AcceptContract', acceptContractSchema);