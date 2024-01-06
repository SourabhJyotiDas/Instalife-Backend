import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {

    const { token } = req.cookies;
    const googletoken = req.cookies["connect.sid"];

    if (googletoken) {
      return next()
    }

    if (token) {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id);
      return next();
    }

    return res.status(500).json({
      success: false,
      message: "Login First",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const isGoogleAuthenticated = async (req, res, next) => {
  //   try {
  //     const token = req.cookies["connect.sid"];

  //     if (!token) {
  //       return next(new ErrorHandler("Not Logged In", 401));
  //     }
  //     next();
  //   } catch (error) {
  //     return next(new ErrorHandler(error.message, 401));
  //   }
}
