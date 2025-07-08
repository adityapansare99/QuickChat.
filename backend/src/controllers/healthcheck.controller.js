import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";

const health=asynchandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,{},"success"));
})

export {health};