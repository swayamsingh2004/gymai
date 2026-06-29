import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs"
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken"
const registerUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if([username,email,password].some((field)=>field?.trim()=="")){
        throw new ApiError(400,"All Fields Are required");
    }
    const existeduser= await User.findOne({email});
    if(existeduser){
        throw new ApiError(400,"User already exists");
        

    }
    const hashedpassword=await bcrypt.hash(password,10);
    const user= await User.create({
        username:username,
        email:email,
        password:hashedpassword
    })
    const createdUser = await User.findById(user._id).select("-password")
      req.log.info({ userId: user._id }, "New user registered")


    return res.status(201).json(new ApiResponse(201,createdUser,"User created Succesfully"))


})
const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if([email,password].some((field)=>field?.trim()=="")){
        throw new ApiError(400,"All field are required")
    }
    const user=await User.findOne({email});
    if(!user){
        throw new ApiError(400,"User doesnt exist");
    }
    const compare=await bcrypt.compare(password,user.password)
    if(!compare){
        throw new ApiError(400,"Wrong Password")
    }
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
)
    req.log.info({ userId: user._id, email: user.email }, "User logged in")
    res.status(200).cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"


    }).json(new ApiResponse(200,token,"Login Succesful"))

})
const logoutUser = asyncHandler(async (req, res) => {
    req.log.info("User logged out")
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
      })
      .json(new ApiResponse(200, null, "Logged out successfully"))
})
const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Success"))
})
export { registerUser, loginUser ,logoutUser,getCurrentUser}