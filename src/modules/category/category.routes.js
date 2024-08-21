import { Router } from "express";

import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";


const categoryRouter =Router()

categoryRouter.post('/',addCategory)
categoryRouter.get('/',allCategories)
categoryRouter.get('/:id',getCategory)
categoryRouter.put('/:id',updateCategory)
categoryRouter.delete('/:id',deleteCategory)



export default categoryRouter