import { Router } from "express";

import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";


const BrandRouter =Router()

BrandRouter.post('/',addBrand)
BrandRouter.get('/',allBrands)
BrandRouter.get('/:id',getBrand)
BrandRouter.put('/:id',updateBrand)
BrandRouter.delete('/:id',deleteBrand)



export default BrandRouter