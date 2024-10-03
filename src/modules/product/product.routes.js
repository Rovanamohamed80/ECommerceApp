import { Router } from "express";

import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";

import { validate } from "../../middleware/validate.js";
import { deleteProductValidation, updateProductValidation } from "./product.validation.js";


const ProductRouter =Router()

ProductRouter.post('/',uploadMixOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),addProduct)
ProductRouter.get('/',allProducts)
ProductRouter.get('/:id',getProduct)
ProductRouter.put('/:id',uploadMixOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),validate(updateProductValidation),updateProduct)
ProductRouter.delete('/:id',validate(deleteProductValidation),deleteProduct)



export default ProductRouter