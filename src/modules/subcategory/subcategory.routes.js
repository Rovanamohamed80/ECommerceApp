import { Router } from "express";

import { addsubCategory, allsubCategories, deletesubCategory, getsubCategory, updatesubCategory } from "./subcategory.controller.js";


const subCategoryRouter =Router()

subCategoryRouter.post('/',addsubCategory)
subCategoryRouter.get('/',allsubCategories)
subCategoryRouter.get('/:id',getsubCategory)
subCategoryRouter.put('/:id',updatesubCategory)
subCategoryRouter.delete('/:id',deletesubCategory)



export default subCategoryRouter