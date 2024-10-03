import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import BrandModel from "../../../database/models/brand.model.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"



const addBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let Brand = new BrandModel(req.body)
    await Brand.save()
    res.json({message:"success",Brand})
})
const allBrands = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(BrandModel.find(),req.query).pagination().fields().filter().search()
    let Brands = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,Brands})
})

const getBrand = catchError(async(req,res,next)=>{
    let Brand = await BrandModel.findById(req.params.id)
    Brand || next(new AppError('this Brand is not found',404))
    !Brand || res.json({message:"success",Brand})
})

const updateBrand = catchError(async(req,res,next)=>{
    if (req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename
    let Brand = await BrandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    Brand || next(new AppError('this Brand is not found',404))
    !Brand || res.json({message:"success",Brand})
})

const deleteBrand = deleteOne(BrandModel)
export{
    addBrand,allBrands,getBrand,updateBrand,deleteBrand
}