import Comment from "../models/Comment.js"
import Post from "../models/Post.js"

export const addComment=async(req,res)=>{
    try {
        const {userId, postId,comment, commentReference} = req.body
        const newComment = new Comment({
           userId,
           postId,
           comment,
           commentReference,
           votes:0,
        })
        console.log("body",userId,postId,comment)
        const post = await Post.findById(postId)
        if(post){
            const uploadComment = await newComment.save()
            if(commentReference){
                const parentComment = await Comment.findByIdAndUpdate(commentReference,{ $push: { replies: uploadComment._id } })
            }
           
                
            const comments = await Comment.find({postId:`${postId}`})
            res.status(200).json(comments)
        }else{
            res.status(404).send("post not found")
        }
        
    } catch (error) {
        
    }

}

export const getCommentByPost=async(req, res)=>{
    try{
    const {postId} = req.params
    const comments = await Comment.find({$and: [{postId:`${postId}`}, {commentReference: { $exists: false } }]})
   console.log(comments)
    if(comments.length>0){
        res.status(200).json(comments)
    }else(
        res.status(404).json([])
    )
    } catch(error){
        res.status(403).send(error)
    }
}

export const getAllCommentByPost=async(req, res)=>{
    try{
    const {postId} = req.params
    const comments = await Comment.find({postId:`${postId}`})
   console.log(comments)
    if(comments.length>0){
        res.status(200).json(comments)
    }else(
        res.status(404).json([])
    )
    } catch(error){
        res.status(403).send(error)
    }
}

export const getCommentReplies = async(req,res)=>{
    try {
    const {postId} = req.params
    const comments = await Comment.find({$and: [{postId:`${postId}`}, {commentReference: { $exists: true } }]})
   console.log(comments)
    if(comments.length>0){
        res.status(200).json(comments)
    }else(
        res.status(404).json([])
    )
    } catch (error) {
        res.status(403).send(error)
    }
}



export const likeComment=async(req,res)=>{
    const {commentId,condition,votetype} = req.params
    try {
        const parsedCondition = parseInt(condition)===1
        let updatedComment;
        const upvote = votetype==="upvote"
        // Update the likes count using findByIdAndUpdate
        if(upvote){
             updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                { $inc: { votes: parsedCondition?2:1 } }, // Increment likes by 1
                { new: true } // Return the updated document
              );
        }else{
             updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                { $inc: { votes:  parsedCondition?-2:-1 } }, // Increment likes by 1
                { new: true } // Return the updated document
              );
        }
        
    
        if (!updatedComment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
    
        return res.status(200).json({ message: 'Comment liked successfully', comment: updatedComment });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      } 

}


// export const replyComment=async(req,res)=>{
//     console.log("came here")
//     const {userId,postId, commentReference, comment} = req.body
//     const replyComment = new Comment({
//         "userId":userId,
//         "postId":postId,
//         "commentReference":commentReference,
//         "comment":comment,
//         "like":{},
//         "replies":[]
        
//     })
    
   
//     const getCommentFromArray=(array)=>{
        
//         array.forEach((ele)=>{
            
//             if(ele._id==commentReference){
    
//                 const newComment = ele
//                 newComment.replies.push(replyComment)
//                 console.log("replyComment",replyComment)
//                 console.log("newComment",newComment)
//                 return newComment.save()
               
//             }else{
//                 if(ele.replies.length>0){
//                 console.log("comment not found")
                
//                     getCommentFromArray(ele.reply)
//                 }
                
//             }
//         })
//     }


    
//     console.log("here")
//     const parentComments = await Comment.find({postId:`${postId}`})
//     console.log("parentComments",parentComments)
//     const parComment = getCommentFromArray(parentComments)
//     const saved = await parComment.save()
//     res.status(200).json(saved)
   
    
// }