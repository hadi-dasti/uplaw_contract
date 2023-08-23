import { Schema, model, Document, Model,Types} from 'mongoose';
import { join } from 'path';
import dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { IAcceptContract } from '../AcceptContract/AcceptContractEmployee';



// setup join path as dotenv
dotenv.config({ path: join(__dirname, '../../../../uplaw_contract/.env') });
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;


// Create an interface representing a document in MongoDB.
export interface IEmployee extends Document{
    firstName: string,
    lastName: string,
    password: string,
    address: string,
    email: string,
    age: number,
    nationalCode: string,
    numberMobile: string,
    gender: 'MALE'| 'FEMALE',
    isActive: boolean,
    mobileOtp: string,
    createAt: Date,
    verificationCodeSentAt: Date,
    googleId:string,
    profileImage: string,
    acceptedContract:Types.ObjectId | IAcceptContract,
    generateAccessTokenEmployee: () => string,
    generateRefreshTokenEmployee: () => string,
    refreshToken: string,
    telegram_username: string,
    isComparePassword:(password: string) => Promise<boolean>
}

// Create a Schema corresponding to the document interface
export const employeeSchema = new Schema<IEmployee>({
    firstName: { type: String, minlength: 3, maxlength: 10 },
    lastName: { type: String, minlength: 2, maxlength: 20 },
    password: { type: String,unique:false,indexes:0, minlength: 8},
    address: { type: String, minlength: 10, trim: true },
    email: { type: String, unique: true },
    googleId: { type: String, unique: true },
    age: {
        type: Number,
        validate: {
            validator: (value: number) => {
                return value >= 18 && value <= 60
            },
            message: 'Age must be between 18 and 60'
        },
    },
    nationalCode: { type: String, minlength: 9, unique: true },
    numberMobile: { type: String, minlength: 11 },
    gender: { type: String, enum: ['MALE', 'FEMALE'] },
    isActive: { type: Boolean, default: true },
    mobileOtp: { type: String },
    createAt: { type: Date, default: Date.now },
    profileImage: {
        type: String, validate: {
            validator: function (v: string) {
                return /\.(jpg|jpeg|png|gif)$/i.test(v);
            },
            message: 'Profile image must be a valid image file (jpg, jpeg, png, or gif).'
        }
    },
    verificationCodeSentAt: { type: Date, default: Date.now },
    refreshToken: { type: String },
    acceptedContract: [{ type: Schema.Types.ObjectId, ref: 'AcceptContract' }],
}, {
    timestamps: true
});


// Hash the employee's password before saving to the database
employeeSchema.pre<Model<IEmployee> & IEmployee>('save', async function (next) {
    const employee = this;
    if (!employee.isModified('password')) {
        return next();
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(employee.password, salt);
    next();
});

// compare password
employeeSchema.methods.isComparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
};

// Hash the employee's Google ID before saving to the database
employeeSchema.pre<Model<IEmployee> & IEmployee>('save', async function (next) {
    const employee = this;
    if (!employee.isModified('googleId')) {
        return next()
    }
    //hash googleId
    const salt = await bcrypt.genSalt(10);
    employee.googleId = await bcrypt.hash(employee.googleId, salt);
    return next()
});

// create accessToken for employee with employeeId
employeeSchema.methods.generateAccessTokenEmployee = function () {
    const accessToken = jwt.sign({ employeeId: this._id },
        JWT_SECRET as Secret,
        { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME });
    
    const now = new Date();
    const timeNow = now.toLocaleString()
    console.log(`Access token generated at ${timeNow}`);

    return accessToken;
};

// create refreshToken for employee with employeeId
employeeSchema.methods.generateRefreshTokenEmployee = function () {
    const refreshToken = jwt.sign({ employeeId: this._id },
        JWT_SECRET as Secret,
        { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME });
    return refreshToken
};

//  Create a Model.
export const Employee = model<IEmployee>('Employee', employeeSchema);

