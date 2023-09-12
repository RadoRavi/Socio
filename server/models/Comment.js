import mongoose from "mongoose";

const comment = new mongoose.Schema({
      userId: {
        type: String,
        requied: true,
      },
      postId: {
        type: String,
        requied: true,
      },
      comment: String,
      votes: {
        type: Number,
        default:0
      },
      commentReference: String,
      replies:{
        type: Array,
        default:[]
      },
      

},{timestamps:true})

const Comment =  mongoose.model("Comment",comment)
export default Comment