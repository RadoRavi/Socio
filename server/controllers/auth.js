import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async(req,res)=>{
    
    try {
        const {
            firstName,
            lastName,
            password,
            location,
            occupation,
            email
        } = req.body
        
const salt = await bcrypt.genSalt()

const hashPassword =   await bcrypt.hash(password, salt)
console.log(
    firstName,
    lastName,
    password,
    location,
    occupation,
    email)
const newUser =new User({
            
            firstName,
            lastName,
            email,
            password:hashPassword,
            location,
            occupation,
            friends:[],
            posts:[],
            views:1,
            impressions:0
})
console.log("3")
const savedUser = await  newUser.save();
res.status(200).json(savedUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const login = async(req,res)=>{
    const {email,password}=req.body
    
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(404).json({status:false,message:"user not found"})
    }
    const passwordMatch = await bcrypt.compare(password,user.password)
    console.log(passwordMatch)
    if(!passwordMatch){
        return res.status(500).json({status:false,message:"invalid credential"})
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    delete user.password
    console.log(token,user)
    res.status(200).json({token,user})
}