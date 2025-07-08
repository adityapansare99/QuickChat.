import { asynchandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const auth = asynchandler(async (req, res, next) => {
  const token =
    req.cookies.token ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.body.token;

    if(!token){
        return res.status(401).json(new ApiResponse(401,{},'Login to continue'));
    }

    try {
        const userId=jwt.verify(token,process.env.accesstoken);
    
        if(!userId){
            return res.status(401).json(new ApiResponse(401,{},'Login to continue'));
        }
    
        const user=await User.findById(userId._id).select('-password');
    
        if(!user){
            return res.status(401).json(new ApiResponse(401,{},'User not found'));
        }
    
        req.user=user;
        next();
    } catch (error) {
        res.status(401).json(new ApiResponse(401,error,'Login to continue'));
    }

});

export { auth };
