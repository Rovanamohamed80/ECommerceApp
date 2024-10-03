import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import ProductModel from "../../../database/models/product.model.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import { deleteOne } from "../handlers/handlers.js"


const addProduct = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(img=>img.filename)
    let Product = new ProductModel(req.body)
    await Product.save()
    res.json({message:"success",Product})
})

const allProducts = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(ProductModel.find(),req.query).pagination().fields().filter().search()
    let Products = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,Products})
})

const getProduct = catchError(async(req,res,next)=>{
    let Product = await ProductModel.findById(req.params.id)
    Product || next(new AppError('this Product is not found',404))
    !Product || res.json({message:"success",Product})
})

const updateProduct = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    let Product = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    Product || next(new AppError('this Product is not found',404))
    !Product || res.json({message:"success",Product})
})

const deleteProduct = deleteOne(ProductModel)
export{
    addProduct,allProducts,getProduct,updateProduct,deleteProduct
}