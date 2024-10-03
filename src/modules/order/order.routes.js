import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckout, getAllOrders, getUserOrders } from "./order.controller.js";
import { validate } from "../../middleware/validate.js";
import { createOrderValidation } from "./order.validation.js";


const OrderRouter =Router()

OrderRouter.post('/:id',protectedRoutes,allowedTo('user'),validate(createOrderValidation),createCashOrder)
OrderRouter.get('/',protectedRoutes,allowedTo('admin'),getAllOrders)
OrderRouter.get('/users',protectedRoutes,allowedTo('user','admin'),getUserOrders)
OrderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user'),createCheckout)



export default OrderRouter

