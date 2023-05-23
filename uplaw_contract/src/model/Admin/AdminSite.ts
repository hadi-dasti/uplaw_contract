import { Schema,model,Document } from "mongoose";
import * as bcrypt from 'bcryptjs';
import { join } from 'path';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

// setup join path as dotenv
dotenv.config({ path: join(__dirname, '../../../../uplaw_contract/.env') });
export const JWT_SECRETE_ADMIN = process.env.JWT_SECRETE_ADMIN;


// 1. Create an interface IAdmin representing a document in MongoDB.
export interface IAdmin extends Document {
    fullName : string,
    email: string,
    password: string,
    position: string,
    mobileNumber: string,
    generateTokenAdmin : ()=> string
}

//2. Create a SchemaAdmin corresponding to the document interface IAdmin.
const adminSchema = new Schema<IAdmin>({
    fullName: { type: String, minlength: (3), required: [true, 'please provide a fullName'] },
    email: { type: String, unique: true, required: [true, 'please provide an email'] },
    password: { type: String, unique: true, minlength: (8), required: [true, 'please provide a password'] },
    position: { type: String, required: [true, 'please provide a position'] },
    mobileNumber:{type:String,unique :true,minlength:(11),required:[true,'please provide a mobileNumber']}
}, {
    timestamps:true
})

// create middleware pre for save password before change password
adminSchema.pre<IAdmin>('save', async function (next) {
    const admin = this;
    if (!admin.isModified('password')) {
        return next()
    };
    // hash password Admin 
    const hashPassword = await bcrypt.hash(admin.password, 10)
    admin.password = hashPassword
    return next()
});

// create token for admin 
adminSchema.methods.generateTokenAdmin = function () {
    const token = jwt.sign({ adminId: this._id.toString() },
        JWT_SECRETE_ADMIN as Secret,
        { expiresIn: '48h' });
    return token;
};

// 3. Create a Model of AdminSchema
export const Admin = model<IAdmin>('Admin', adminSchema)


