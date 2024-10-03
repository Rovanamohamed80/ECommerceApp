import UserModel from "../../database/models/user.model.js";
import { AppError } from "../utils/appError.js";

export const checkEmail = async(req,res,next) =>{
    let user = await UserModel.findOne({email:req.body.email})
    if(user) return next(new AppError("this email is already exists." , 409))
    next()
      
}