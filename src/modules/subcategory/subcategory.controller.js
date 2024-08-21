import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import SubCategoryModel from "../../../database/models/subcategory.model.js"
import CategoryModel from "../../../database/models/category.model.js"


const addsubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategoryModel(req.body)
    let category = await CategoryModel.findById({_id:req.body.category})
    category || next(new AppError('this category is not found',404))
    !category || await subCategory.save()
    res.json({message:"success",subCategory})
})
const allsubCategories = catchError(async(req,res,next)=>{
    let subCategories = await SubCategoryModel.find()
    res.json({message:"success",subCategories})
})

const getsubCategory = catchError(async(req,res,next)=>{
    let subCategory = await SubCategoryModel.findById(req.params.id)
    subCategory || next(new AppError('this subCategory is not found',404))
    !subCategory || res.json({message:"success",subCategory})
})

const updatesubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = await SubCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subCategory || next(new AppError('this subCategory is not found',404))
    !subCategory || res.json({message:"success",subCategory})
})

const deletesubCategory = catchError(async(req,res,next)=>{
    let subCategory = await SubCategoryModel.findByIdAndDelete(req.params.id)
    subCategory || next(new AppError('this subCategory is not found',404))
    !subCategory || res.json({message:"success",subCategory})
}
)
export{
    addsubCategory,allsubCategories,getsubCategory,updatesubCategory,deletesubCategory
}