import slugify from "slugify"
import CategoryModel from "../../../database/models/category.model.js"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"


const addCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new CategoryModel(req.body)
    await category.save()
    res.json({message:"success",category})
})
const allCategories = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(CategoryModel.find(),req.query).pagination().fields().filter().search()
    let Categories = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,Categories})
})

const getCategory = catchError(async(req,res,next)=>{
    let category = await CategoryModel.findById(req.params.id)
    category || next(new AppError('this category is not found',404))
    !category || res.json({message:"success",category})
})

const updateCategory = catchError(async(req,res,next)=>{
    if (req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.image = req.file.filename
    let category = await CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    category || next(new AppError('this category is not found',404))
    !category || res.json({message:"success",category})
})

const deleteCategory = deleteOne(CategoryModel)
export{
    addCategory,allCategories,getCategory,updateCategory,deleteCategory
}