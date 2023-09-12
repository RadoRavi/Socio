import jwt from "jsonwebtoken"

export const verifyToken = async(req,res,next)=>{
    try {
        const {token} = req.header("Authorization")
    if(!token){
        return res.status(400).json({"error":"authorization token not added"})
    }
    const verified = jwt.verify(token,process.env.JWT_SECRET)
    req.user = verified
    next();
    } catch (error) {
        
    }
    
}