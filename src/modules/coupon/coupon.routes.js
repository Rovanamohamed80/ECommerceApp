import { Router } from "express";
import { addcoupon, allcoupons, deletecoupon, getcoupon, updatecoupon } from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCouponValidation, deleteCouponValidation, getSpecificCouponValidation, updateCouponValidation } from "./coupon.validation.js";
import { validate } from "../../middleware/validate.js";


const couponRouter =Router()

couponRouter.post('/',protectedRoutes,allowedTo('admin'),validate(createCouponValidation),addcoupon)
couponRouter.get('/',protectedRoutes,allowedTo('admin'),allcoupons)
couponRouter.get('/:id',protectedRoutes,allowedTo('admin'),validate(getSpecificCouponValidation),getcoupon)
couponRouter.put('/:id',protectedRoutes,allowedTo('admin'),validate(updateCouponValidation),updatecoupon)
couponRouter.delete('/:id',protectedRoutes,allowedTo('admin'),validate(deleteCouponValidation),deletecoupon)


export default couponRouter