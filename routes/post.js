import express from "express";
import { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment, exploreallposts, } from "../controllers/post.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.route("/post/upload").post(isAuthenticated, createPost);

router.route("/post/allposts").get(isAuthenticated, exploreallposts);

router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost)


router.route("/posts").get(isAuthenticated, getPostOfFollowing);

router.route("/post/:id").put(isAuthenticated, updateCaption)

router.route("/post/:id").delete(isAuthenticated, deletePost);


router.route("/post/comment/:id").put(isAuthenticated, commentOnPost);

router.route("/post/comment/:id").delete(isAuthenticated, deleteComment);


export default router;
