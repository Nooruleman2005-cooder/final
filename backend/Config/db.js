import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
const mongooseConnect = process.env.MONGOOSE_URL

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(mongooseConnect)
        console.log("Mongodb Connected Successfully....")
    }
    catch (err) {
        console.log("Db Connection Error ....", err)
    }
}

export default connectDB;