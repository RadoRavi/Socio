import express from "express"
import {getUser,getUserFriends,addRemoveFriend,getUserByName,getAllUser,getUserAvatarDetails} from "../controllers/user.js"
import {verifyToken} from "../middleware/auth.js"

const router = express.Router();

router.get("/:id", getUser)
router.get("/useravatar/:id", getUserAvatarDetails)
router.get("/all", getAllUser)
router.get("/find/:name", getUserByName)
router.get("/:id/friends", verifyToken, getUserFriends)
router.patch("/:id/:friendId",addRemoveFriend)

export default router