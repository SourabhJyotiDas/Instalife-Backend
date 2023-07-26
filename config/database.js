import mongoose from "mongoose";

export const connectToDatabase = ()=>{
   mongoose.connect(process.env.MONGO_URI)
   .then((ele)=>{
      console.log(`Mongoose Connected: ${ele.connection.host}`)
   })
   .catch((err)=>{
      console.log(err)
   })
}