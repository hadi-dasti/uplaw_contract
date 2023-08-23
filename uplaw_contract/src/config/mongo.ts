import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join } from 'path';


// Load environment variables from .env files
dotenv.config({path:join(__dirname, './../../.env')});

// config url
export const MONGO_URL = process.env.MONGO_URL as string
const autoIndex = process.env.NODE_ENV === 'development';


// connect database mongodb
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL, {
            autoIndex
        })
        console.log('mongodb connect successfully ')
    } catch (err:any) {
        console.log('MongoDB connection error:', err)
    };
};



export default connectDB;