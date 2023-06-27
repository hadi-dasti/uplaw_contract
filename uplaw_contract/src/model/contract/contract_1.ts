import { model, Document, Schema, Types } from "mongoose";
import { IAcceptContract } from '../AcceptContract/AcceptContractEmployee';


// Create an interface representing clause in paragraph
export interface IClause extends Document{
    key: String,
    value: string,
    type:string
};

// Create an interface representing paragraph in contract_1
export interface IParagraphs extends Document{
    title_paragraph: string,
    priority: number,
    clauseParagraph :IClause[]
};

// Create an interface representing contract_1 a document in MongoDB.
export interface IContract_1 extends Document{
    title: string,
    description: string,
    typeContract: string,
    price: string,
    paragraphs: IParagraphs[],
    acceptedContract:Types.ObjectId | IAcceptContract
};


//build schema embedded of clause in paragraph
export const clauseParagraphSchema: Schema = new Schema({
    key: { type: String, required: true },
    value: { type: Schema.Types.Mixed, default: "" },
    type: { type: String, enum: ["SELECT", "QA", "TEXT", "TABLE", "BLANK SPACE"] },
});

 //build schema embedded of paragraph in contract_1
export const paragraphSchema: Schema = new Schema({
    title_paragraph: { type: String, required: [true, 'please  provide a title paragraph'] },
    priority: { type: Number, default: 0 },
    clauseParagraph: { type: [clauseParagraphSchema], default: [] }
});

// build schema of contract_1
export const contractSchema = new Schema<IContract_1>({
    title: { type: String, required: [true, 'please provide a title contract'] },
    description: { type: String, required: [true, 'please provide a description contract'] },
    typeContract: { type: String, required: [true, 'please provide a  typeContract '] },
    price: { type: String, required: [true, 'please provide a price contract'] },
    paragraphs: { type: [paragraphSchema], default: [] },
    acceptedContract: { type: [Schema.Types.ObjectId], ref: 'AcceptContract' }
}, {
    timestamps: true
});

// build model of contractSchema
export const Contract_1 = model<IContract_1>('Contract_1', contractSchema);