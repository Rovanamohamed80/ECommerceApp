import { Router } from "express";

import { addsubCategory, allsubCategories, deletesubCategory, getsubCategory, updatesubCategory } from "./subcategory.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { createsubCategoryValidation, deletesubCategoryValidation, getSpecificsubCategoryValidation, updatesubCategoryValidation } from "./subcategory.validation.js";


const subCategoryRouter =Router({mergeParams:true})

subCategoryRouter.post('/',protectedRoutes,allowedTo('admin'),validate(createsubCategoryValidation),addsubCategory)
subCategoryRouter.get('/',allsubCategories)
subCategoryRouter.get('/:id',validate(getSpecificsubCategoryValidation),getsubCategory)
subCategoryRouter.put('/:id',protectedRoutes,allowedTo('admin'),validate(updatesubCategoryValidation),updatesubCategory)
subCategoryRouter.delete('/:id',protectedRoutes,allowedTo('admin'),validate(deletesubCategoryValidation),deletesubCategory)



export default subCategoryRouter