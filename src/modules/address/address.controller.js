import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import UserModel from "../../../database/models/user.model.js"


const addAddress = catchError(async(req,res,next)=>{

    let address = await UserModel.findByIdAndUpdate(req.user._id,{$push:{addresses:req.body}},{new:true})
    address || next(new AppError('this address is not found',404))
    !address || res.json({message:"success",address:address.addresses})
})

const removeAddress = catchError(async(req,res,next)=>{

    let address = await UserModel.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
    address || next(new AppError('this address is not found',404))
    !address || res.json({message:"success",address:address.addresses})
})


const getLoggedUserAddresses = catchError(async(req,res,next)=>{

    let address = await UserModel.findById(req.user._id)
    address || next(new AppError('this address is not found',404))
    !address || res.json({message:"success",address:address.addresses})

})


export{
    addAddress,removeAddress,getLoggedUserAddresses
}