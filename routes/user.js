import express from "express";
import { register, login, followUser, logout, updatePassword, updateProfile, deleteMyProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword, getMyPosts, getUserPosts, getMyProfile, googleLogout, } from "../controllers/user.js";
import { isAuthenticated, isGoogleAuthenticated } from "../middlewares/auth.js";
import passport from "passport";


const router = express.Router();

router.get(
   "/googlelogin",
   passport.authenticate("google", {
      scope: ["profile"],
   })
);

router.get(
   "/login",
   passport.authenticate("google", {
      successRedirect: "http://localhost:3000",
      //   successRedirect: "https://react-auth20.netlify.app",
   })
);

router.get("/me",  isAuthenticated, getMyProfile);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/googlelogout").get(googleLogout);

router.route("/follow/:id").get(isAuthenticated , followUser);

router.route("/update/password").put(isAuthenticated , updatePassword);

router.route("/update/profile").put(isAuthenticated , updateProfile);

router.route("/delete/me").delete(isAuthenticated , deleteMyProfile);

// router.route("/me").get(isAuthenticated , myProfile);

router.route("/my/posts").get(isAuthenticated , getMyPosts);

router.route("/userposts/:id").get(isAuthenticated , getUserPosts);

router.route("/user/:id").get(isAuthenticated , getUserProfile);

router.route("/users").get(isAuthenticated , getAllUsers);

router.route("/forgot/password").post(isAuthenticated , forgotPassword);

router.route("/password/reset/:token").put(isAuthenticated , resetPassword);

export default router
