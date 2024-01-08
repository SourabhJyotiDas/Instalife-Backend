import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const userSchema = new mongoose.Schema({

   googleId: String,
   
   name: {
      type: String,
      required: [true, "Please enter a name"],
   },

   avatar: {
      public_id: String,
      url: String,
   },

   password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
   },

   role: {
      type: String,
      default: "user",
   },

   posts: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post",
      },
   ],

   followers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],

   following: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],

   resetPasswordToken: String,
   resetPasswordExpire: Date,
});

const User = mongoose.model("User", userSchema);
export default User;