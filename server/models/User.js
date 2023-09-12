import mongoose from "mongoose";

const user = new mongoose.Schema({
      firstName: {
        type: String,

        requied: true,
      },
      lastName: {
        type: String,

        requied: true,
      },
      email: {
        type: String,
        unique: true,
        requied: true,
      },
      password: {
        type: String,
        requied: true,
      },
      picturePath:String,
      location: {
        type: String,
        
        requied: true,
      },
      occupation: {
        type: String,
       
        requied: true,
      },
      friends: {
        type: Array,
        default:[]
      },
      viewedProfile: {
        type: Number,
        default:1
      },
      impressions: {
        type: Number,
        default:0
      },
},{timestamps:true})

const User =  mongoose.model("User",user)
export default User