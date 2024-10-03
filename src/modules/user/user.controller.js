import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import UserModel from "../../../database/models/user.model.js"


const addUser = catchError(async(req,res,next)=>{
    let User = new UserModel(req.body)
    await User.save()
    res.json({message:"success",User})
})
const allUsers = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(UserModel.find(),req.query).pagination().fields().filter().search()
    let Users = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,Users})
})

const getUser = catchError(async(req,res,next)=>{
    let User = await UserModel.findById(req.params.id)
    User || next(new AppError('this User is not found',404))
    !User || res.json({message:"success",User})
})

const updateUser = catchError(async(req,res,next)=>{
    let User = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    User || next(new AppError('this User is not found',404))
    !User || res.json({message:"success",User})
})

const deleteUser = deleteOne(UserModel)
export{
    addUser,allUsers,getUser,updateUser,deleteUser
}