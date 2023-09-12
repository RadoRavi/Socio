import express from "express";
import bodyParser from "body-parser";
import mongoose, { Mongoose } from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"

import http from 'http';

import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import authRoutes from "./router/auth.js"
import userRoutes from "./router/user.js"
import postRoutes from "./router/post.js"
import commentRoutes from "./router/comment.js"
import User from "./models/User.js";
import {users,posts} from "./data/index.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
      //console.log("filename",file.originalname)
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  app.post("/auth/register", upload.single("picture"),register)
  app.post("/post", upload.single("picture"),createPost)
  app.use("/auth",authRoutes)
  app.use("/user",userRoutes)
  app.use("/post",postRoutes)
  app.use("/comment",commentRoutes)
  //app.use(express.static(`${__dirname}/public/assets`));
  const PORT = process.env.PORT||6001;


  mongoose.connect("mongodb+srv://vidhu:vidhu1999@cluster0.yfohxrx.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(()=>{
    app.listen(PORT,()=>console.log(`SERVER PORT ${PORT}`))
    
  }).catch((error)=>console.log(`${error} this is the error`))
  