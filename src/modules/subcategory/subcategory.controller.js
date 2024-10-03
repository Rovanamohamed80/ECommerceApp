import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import SubCategoryModel from "../../../database/models/subcategory.model.js"
import CategoryModel from "../../../database/models/category.model.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"


const addsubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategoryModel(req.body)
    let category = await CategoryModel.findById({_id:req.body.category})
    category || next(new AppError('this category is not found',404))
    !category || await subCategory.save()
    res.json({message:"success",subCategory})
})
const allsubCategories = catchError(async(req,res,next)=>{
    let filterObj ={}
    if(req.params.category) filterObj.category = req.params.category
    let apiFeatures = new ApiFeatures(SubCategoryModel.find(filterObj),req.query).pagination().fields().filter().search()
    let subCategories = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,subCategories})
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

const deletesubCategory = deleteOne(SubCategoryModel)
export{
    addsubCategory,allsubCategories,getsubCategory,updatesubCategory,deletesubCategory
}