import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;   // 👈 SAME NAME AS RENDER
    if(!mongoUri){
      throw new Error("MONGO_URI not found in environment variables");
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1);
  }
};
