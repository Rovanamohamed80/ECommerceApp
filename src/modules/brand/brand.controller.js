import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import BrandModel from "../../../database/models/brand.model.js"



const addBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let Brand = new BrandModel(req.body)
    await Brand.save()
    res.json({message:"success",Brand})
})
const allBrands = catchError(async(req,res,next)=>{
    let Brands = await BrandModel.find()
    res.json({message:"success",Brands})
})

const getBrand = catchError(async(req,res,next)=>{
    let Brand = await BrandModel.findById(req.params.id)
    Brand || next(new AppError('this Brand is not found',404))
    !Brand || res.json({message:"success",Brand})
})

const updateBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let Brand = await BrandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    Brand || next(new AppError('this Brand is not found',404))
    !Brand || res.json({message:"success",Brand})
})

const deleteBrand = catchError(async(req,res,next)=>{
    let Brand = await BrandModel.findByIdAndDelete(req.params.id)
    Brand || next(new AppError('this Brand is not found',404))
    !Brand || res.json({message:"success",Brand})
}
)
export{
    addBrand,allBrands,getBrand,updateBrand,deleteBrand
}