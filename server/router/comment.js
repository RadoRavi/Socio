import express from "express"
import {addComment,likeComment,getCommentByPost,getCommentReplies,getAllCommentByPost} from "../controllers/comment.js"

const router = express.Router()
router.get ("/get/:postId",getCommentByPost)
router.get ("/get/all/:postId",getAllCommentByPost)
router.get ("/get/ref/:postId",getCommentReplies)
router.post("/add",addComment)
router.patch("/vote/:votetype/:commentId/:condition",likeComment)



export default router