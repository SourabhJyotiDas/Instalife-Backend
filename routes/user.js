import express from "express";
import { deleteMyProfile, followUser, forgotPassword, getAllUsers, getMyPosts, getUserPosts, getUserProfile, login, logout, myProfile, register, resetPassword, updatePassword, updateProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";


const router = express.Router();

router.route("/register").post(singleUpload,register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated , myProfile);

router.route("/update/profile").put(singleUpload,isAuthenticated , updateProfile);

router.route("/update/password").put(isAuthenticated , updatePassword);

router.route("/delete/me").delete(isAuthenticated , deleteMyProfile);

router.route("/my/posts").get(isAuthenticated , getMyPosts);

router.route("/follow/:id").get(isAuthenticated , followUser);

router.route("/user/:id").get(isAuthenticated , getUserProfile);

router.route("/userposts/:id").get(isAuthenticated , getUserPosts);

router.route("/users").get(isAuthenticated , getAllUsers);

router.route("/forgot/password").post(isAuthenticated , forgotPassword);

router.route("/password/reset/:token").put(isAuthenticated , resetPassword);

export default router
