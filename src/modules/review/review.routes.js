import { Router } from "express";
import { addReview,allReviews,deleteReview,getReview,updateReview } from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createReviewValidation, deleteReviewValidation, getSpecificReviewValidation, updateReviewValidation } from "./review.validation.js";
import { validate } from "../../middleware/validate.js";


const ReviewRouter =Router()

ReviewRouter.post('/',protectedRoutes,allowedTo('user'),validate(createReviewValidation),addReview)
ReviewRouter.get('/',allReviews)
ReviewRouter.get('/:id',validate(getSpecificReviewValidation),getReview)
ReviewRouter.put('/:id',protectedRoutes,allowedTo('user'),validate(updateReviewValidation),updateReview)
ReviewRouter.delete('/:id',protectedRoutes,allowedTo('user','admin'),validate(deleteReviewValidation),deleteReview)



export default ReviewRouter