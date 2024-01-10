import mongoose from "mongoose";

export const connectToDatabase = async () => {
   try {
      const { connection } = await mongoose.connect(process.env.MONGO_URI_LOCAL);
      console.log(`MongoDB connected with ${connection.host}`);
   } catch (error) {
      console.log(error.message);
   }
}