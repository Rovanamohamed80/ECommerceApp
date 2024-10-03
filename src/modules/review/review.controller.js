import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import ReviewModel from "../../../database/models/review.model.js"


const addReview = catchError(async(req,res,next)=>{
    req.body.user = req.user._id
    let isExist = await ReviewModel.findOne({user:req.user._id, product:req.body.product})
    if(isExist) return next(new AppError('you created a comment before',409))
    let Review = new ReviewModel(req.body)
    await Review.save()
    res.json({message:"success",Review})
})

const allReviews = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(ReviewModel.find(),req.query).pagination().fields().filter().search()
    let Reviews = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,Reviews})
})

const getReview = catchError(async(req,res,next)=>{
    let Review = await ReviewModel.findById(req.params.id)
    Review || next(new AppError('this Review is not found',404))
    !Review || res.json({message:"success",Review})
})

const updateReview = catchError(async(req,res,next)=>{

    let Review = await ReviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    Review || next(new AppError('this Review is not found or you are not created review',404))
    !Review || res.json({message:"success",Review})
})

const deleteReview = deleteOne(ReviewModel)

export{
    addReview,allReviews,getReview,updateReview,deleteReview
}