import User from "../models/User.js"


export const getUser = async(req,res)=>{
    try {
        const {id} = req.params
        console.log("dddddd")
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
}

export const getUserByName = async(req,res)=>{
    try {
        const {name} = req.params
        const user = await User.find({firstName:`${name}`})
        res.status(200).json(user)
    } catch (error) {
          res.status(404).json({message:error.message})
    }
}

export const getUserFriends = async(req,res)=>{
    try {
        const id = req.param.id
    const user = await User.findById(id)
    if(!user){
        res.status(404).json({message:error.message})
    }
    const friends = await Promise.all(
        user.friends.map(friendId=> User.findById(friendId))
    )
    const formattedList = friends.map(({_id,username,firstName,email,location})=>{
        return {_id,username,firstName,email,location}})
    res.status(200).json(formattedList)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
}

export const getUserAvatarDetails= async(req,res)=>{
    try {
        const {id} = req.params
        
        const user = await User.findById(id,{firstName:1,picturePath:1,lastName:1})
        console.log(user)
        if(!user){
            res.status(404).json({message:error.message})
        }else{
            res.status(200).json(user)
        }
    } catch (error) {
        
    }
}


export const addRemoveFriend = async(req,res)=>{
    try {
    const {id,friendId} = req.params
    if(id===friendId){
        return res.status(404).json({message:"friend and user ids are same"})
    }
    const user = await User.findById(id)
    const friendUser = await User.findById(friendId)
    if(user.friends.includes(friendId)){
       user.friends = user.friends.filter(ele=>(ele!==friendId)&&ele!==0)
       friendUser.friends = friendUser.friends.filter(ele=>ele!==id)
    }else{
        console.log("hi")
        user.friends.push(friendId)
        user.friends = user.friends.filter(ele=>ele!==0)
        friendUser.friends.push(id)
        console.log("he")
    }
    await user.save();
    await friendUser.save();
    if(user.friends.length>0){
    const friends = await Promise.all(
        user.friends.map(friendId=> User.findById(friendId))
    )
    console.log("he")
    const formattedList = friends.map(({_id,username,firstName,email,location})=>{
        return {_id,username,firstName,email,location}})
    res.status(200).json(formattedList)
    }else{
        res.status(200).json([])
    }
    
}
     catch (error) {
        res.status(404).json({message:error})
    }
}

export const getAllUser = async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message:"users not found"})
    }
}