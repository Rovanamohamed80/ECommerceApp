import { Router } from "express";

import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { addCategoryValidation, deleteCategoryValidation, getSpecificCategoryValidation, updateCategoryValidation } from "./category.validation.js";
import { validate } from "../../middleware/validate.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter =Router()
categoryRouter.use('/:category/subcategories',subCategoryRouter)
categoryRouter.post('/',protectedRoutes,allowedTo('user','admin','mgr'),uploadSingleFile('image','categories'),validate(addCategoryValidation),addCategory)
categoryRouter.get('/',allCategories)
categoryRouter.get('/:id',validate(getSpecificCategoryValidation),getCategory)
categoryRouter.put('/:id',protectedRoutes,allowedTo('admin','mgr'),uploadSingleFile('image','categories'),validate(updateCategoryValidation),updateCategory)
categoryRouter.delete('/:id',protectedRoutes,allowedTo('admin'),validate(deleteCategoryValidation),deleteCategory)

export default categoryRouter