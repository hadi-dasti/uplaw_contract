import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join } from 'path';


// Load environment variables from .env files
dotenv.config({path:join(__dirname, './../../.env')});

// config url
export const MONGO_URL = process.env.MONGO_URL as string

// connect database mongodb
async function connectDB():Promise<void> {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('mongodb connect successfully ')
    } catch (err) {
        console.log('MongoDB connection error:', err)
    };
};



export default connectDB;