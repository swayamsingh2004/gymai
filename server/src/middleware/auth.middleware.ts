
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}
const verifyJWT=asyncHandler(async (req,res,next)=>{
    const token=req.cookies?.token||req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        throw new ApiError(401,"Unauthorised Request");
    }
    const decodedtoken=jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload
    const user= await User.findById(decodedtoken.userId).select("-password")
    if(!user){
        throw new ApiError(401,"Invalid JWT token")
    }
    req.user=user;
    next();
})
export default verifyJWT;