import express from "express"
import {getAllPost,getAllPostByUser,likePost,deletePost} from "../controllers/post.js"


const router = express.Router();
//getters
router.get("/get",getAllPost)
router.get("/get/:id",getAllPostByUser)
router.patch("/like/:postId/:userId", likePost)
router.delete("/delete/:userId/:postId", deletePost)

export default router