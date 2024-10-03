import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import CouponModel from "../../../database/models/coupon.model.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"


const addcoupon = catchError(async(req,res,next)=>{
    let isExist = await CouponModel.findOne({code:req.body.code})
    if(isExist) return next(new AppError('coupon exists',409))
    let coupon = new CouponModel(req.body)
    await coupon.save()
    res.json({message:"success",coupon})
})

const allcoupons = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(CouponModel.find(),req.query).pagination().fields().filter().search()
    let coupons = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,coupons})
})

const getcoupon = catchError(async(req,res,next)=>{
    let coupon = await CouponModel.findById(req.params.id)
    coupon || next(new AppError('this coupon is not found',404))
    !coupon || res.json({message:"success",coupon})
})

const updatecoupon = catchError(async(req,res,next)=>{

    let coupon = await CouponModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon || next(new AppError('this coupon is not found',404))
    !coupon || res.json({message:"success",coupon})
})

const deletecoupon = deleteOne(CouponModel)
export{
    addcoupon,allcoupons,getcoupon,updatecoupon,deletecoupon
}