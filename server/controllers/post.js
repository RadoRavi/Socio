import Post from "../models/Post.js"
import User from "../models/User.js"


export const createPost = async(req,res)=>{
  const {isDp} = req.query
  
        const {userId,caption,location,picturePath} = req.body
console.log("picturePath",userId)
        const user = await User.findById(userId)
        const post = new Post({
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        location:location,
        caption:caption,
        userPicturePath:user.picturePath,
        picturePath,
        likes:{},
        comments:[]
        })
        
        const {_id} = await post.save()
        // user.posts.push(_id)
        // await user.save()
        const posts = await Post.find();
        console.log(posts.length)
        if(posts.length>0){
            const updateUserDp = await User.findByIdAndUpdate(userId,{picturePath:picturePath})
            console.log("updateUserDp",updateUserDp)
            if(updateUserDp){
            res.status(200).json(posts)
            }
        }

        
    
    }
    

    


export const getAllPost = async(req,res)=>{
    try {
        
        const posts = await Post.find()
        if(posts.length>0){
            res.status(200).json(posts)
        }else{
            res.status(400).json({message:"no post available"})
        }
       
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}

export const getAllPostByUser = async(req,res)=>{
    try {
        const {id} = req.params
        const posts = await Post.find({userId:`${id}`})
        if(posts.length>0){
            res.status(200).json(posts)
        }else{
            res.status(400).json({message:"no post available"})
        }
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const likePost = async(req,res)=>{
    try {
        const {postId,userId} = req.params
        const post = await Post.findById(postId)
        const isLiked  = post.likes.get(userId)
        if(isLiked){
            post.likes.delete(userId)

        }else{
            post.likes.set(userId,true)
        }
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}


export const deletePost = async(req,res)=>{
    try {
        const {userId,postId} = req.params
const post = await Post.findById(postId)
console.log(userId)
console.log(postId)
console.log(post)
if(post.userId===userId){
    console.log("post1")
    const postDeleted = await Post.findByIdAndDelete(postId)
    console.log("post2")
    const allPost = await Post.find()
    console.log("post3")
    res.status(200).json(allPost)
}else{
    res.status(404).send("post not found")
}
    } catch (error) {
        res.status(404).send(error)
    }
    

    
}