import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {addCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateCart} from "./cart.controller.js"
import { addToCartValidation, applyCouponValidation, deleteSpecificItemValidation, updateCartValidation } from "./cart.validation.js";
import { validate } from "../../middleware/validate.js";


const CartRouter =Router()

CartRouter.post('/',protectedRoutes,allowedTo('user'),validate(addToCartValidation),addCart)
CartRouter.put('/:id',protectedRoutes,allowedTo('user'),validate(updateCartValidation),updateCart)
CartRouter.delete('/:id',protectedRoutes,allowedTo('user'),validate(deleteSpecificItemValidation),removeItemFromCart)
CartRouter.get('/',protectedRoutes,allowedTo('user'),getLoggedUserCart)
CartRouter.delete('/',protectedRoutes,allowedTo('user'),clearUserCart)
CartRouter.post('/apply-coupon',protectedRoutes,allowedTo('user'),validate(applyCouponValidation),applyCoupon)


export default CartRouter