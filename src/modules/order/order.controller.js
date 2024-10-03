import { CartModel } from "../../../database/models/cart.model.js"
import { OrderModel } from "../../../database/models/order.model.js"
import ProductModel from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Q5rQiEIkGMrkzV5vFip9pjPthuK6AmbWJ1I6D4delLtz7GE0cKvAdoMcWSb146FPgI3nBDfdN7vSZw6G6UwRwe8002uP82ske');

const createCashOrder = catchError(async(req,res,next)=>{
 
    let cart = await CartModel.findById(req.params.id)
    if(!cart) return next(new AppError('cart not found',404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let order = new OrderModel({
        user:req.user._id,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()
    let options = cart.cartItems.map((prod) =>{
        return ({ updateOne : {
            "filter" : { _id: prod.product}, 
            "update" : { $inc : { sold: prod.quantity ,stock: -prod.quantity } }
         } })
    })
    await ProductModel.bulkWrite(options)
    await CartModel.findByIdAndDelete(cart._id)
    res.json({message:"success",order})
  
})

const getUserOrders = catchError(async(req,res,next)=>{
 let orders = await OrderModel.findOne({user:req.user._id}).populate('orderItems.product')
 res.json({message:"success",orders})
  
})

const getAllOrders = catchError(async(req,res,next)=>{
    let orders = await OrderModel.find({})
    res.json({message:"success",orders})
     
   })

const createCheckout = catchError(async(req,res,next)=>{
    let cart = await CartModel.findById(req.params.id)
    if(!cart) return next(new AppError('cart not found',404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let session = await stripe.checkout.sessions.create({
        line_items: [{
           price_data:{
              currency:'egp',
              unit_amount:totalOrderPrice * 100,
              product_data:{
                name:req.user.name
              }
           },
           quantity:1,
          }
        ],
        mode:'payment',
        success_url:"https://hambozoo.netlify.app/#/orders",
        cancel_url:"https://hambozoo.netlify.app/#/cart",
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
     res.json({message:"success",session})
})


export {
    createCashOrder,getUserOrders,getAllOrders,createCheckout
}
