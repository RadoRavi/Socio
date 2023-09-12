import mongoose from "mongoose";

const post = new mongoose.Schema({
    userId: {
        type: String,
        requied: true,
      },
      firstName: {
        type: String,
        requied: true,
      },
      lastName: {
        type: String,
        requied: true,
      },
      location: String,
      caption: String,
      userPicturePath: String,
      picturePath: String,
      likes: {
        type: Map,
        of:Boolean
      },
      comments: {
        type: Array,
        default:[]
      }

},{timestamps:true})

const Post =  mongoose.model("Post",post)
export default Post