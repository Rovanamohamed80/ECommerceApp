import { Router } from "express";

import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { allowedTo, protectedRoutes} from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addBrandValidation, deleteBrandValidation, updateBrandValidation } from "./brand.validation.js";


const BrandRouter =Router()

BrandRouter.post('/',protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brands'),validate(addBrandValidation),addBrand)
BrandRouter.get('/',allBrands)
BrandRouter.get('/:id',getBrand)
BrandRouter.put('/:id',protectedRoutes,allowedTo('admin'),uploadSingleFile('logo','brands'),validate(updateBrandValidation),updateBrand)
BrandRouter.delete('/:id',protectedRoutes,allowedTo('admin'),validate(deleteBrandValidation),deleteBrand)



export default BrandRouter