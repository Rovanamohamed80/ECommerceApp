import { Router } from "express";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToWishlistValidation, deleteFromWishlistValidation } from "./wishlist.validation.js";
import { validate } from "../../middleware/validate.js";


const WishlistRouter =Router()

WishlistRouter.patch('/',protectedRoutes,allowedTo('user'),validate(addToWishlistValidation),addToWishlist)
WishlistRouter.delete('/:id',protectedRoutes,allowedTo('user','admin'),validate(deleteFromWishlistValidation),removeFromWishlist)
WishlistRouter.get('/',protectedRoutes,allowedTo('user'),getLoggedUserWishlist)

export default WishlistRouter