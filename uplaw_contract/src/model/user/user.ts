import { Schema, model, Document, Model } from 'mongoose';
import * as dotenv from 'dotenv'
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
dotenv.config()
export const JWT_SECRETE = process.env.JWT_SECRETE || 'noyangolii'

// Create an interface representing a document in MongoDB.
export interface IUser extends Document{
    firstName: string,
    lastName: string,
    password: string,
    address: string,
    email: string,
    age: number,
    nationalCode: string,
    numberMobile: string,
    gender: string,
    isActive: boolean,
    mobileOtp: string,
    createAt: Date,
    verificationCodeSentAt: Date,
    generateAuthEmployeeToken:()=> string
}


// Create a Schema corresponding to the document interface
export const userSchema = new Schema<IUser>({
        firstName: { type: String, required: [true, 'please provide a firstName'] },
        lastName: { type: String, required: [true, 'please provide a lastName'] },
        password: { type: String, required: [true, 'please provide a password']},
        address: { type: String, minlength:10, required: [true, 'please provide a address'] },
        email: { type: String, unique: true, required: [true,'please provide a email'] },
        age: {
            type: Number,
            validate: {
                validator:(value: number) => {
                    return value >= 18 && value <= 60
                },
                message : 'Age must be between 18 and 120'
            },
            required :[true,'please provide a age']
        },
        nationalCode: { type: String , minlength:9, required: [true,'please provide a nationalCode']},
        numberMobile: { type: String, minlength: 11, required: [true, 'please provide a numberMobile'] },
        gender: { type: String, enum: ['MALE', 'FEMALE'], required: [true, 'please provide a gender'] },
        isActive: { type: Boolean, required: [true, 'please provide a isActive'] },
        mobileOtp:{type : String, required:false},
        createAt: { type: Date, default: Date.now },
        verificationCodeSentAt: { type: Date, default: Date.now, required: false }
    }, {
            timestamps:true
});


// Hash the user's password before saving to the database
userSchema.pre<Model<IUser> & IUser>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
    }
    // hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// create toke 
userSchema.methods.generateAuthEmployeeToken = function () {
    const token = jwt.sign({ employeeId: this._id },JWT_SECRETE,
        { expiresIn:'24h' })
    return token
}

//  Create a Model.
export const User = model<IUser>('User', userSchema)

