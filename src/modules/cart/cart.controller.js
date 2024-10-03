import { CartModel } from "../../../database/models/cart.model.js"
import CouponModel from "../../../database/models/coupon.model.js"
import ProductModel from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"


function calcTotalPrice (isCartExist){
    isCartExist.totalCartPrice = isCartExist.cartItems.reduce((prev,item) => prev += item.quantity * item.price, 0)
    if(isCartExist.discount){
    isCartExist.totalCartPriceAfterDiscount = isCartExist.totalCartPrice - (isCartExist.totalCartPrice * isCartExist.discount) / 100
}
}




const addCart = catchError(async(req,res,next)=>{

    let isCartExist = await CartModel.findOne({user:req.user._id})
    let product = await ProductModel.findById(req.body.product)
    if(!product) return next(new AppError('product not found',404))
    req.body.price = product.price
    if(req.body.quantity > product.stock) return next(new AppError('Sold Out',404))
    if(!isCartExist){
        let cart = new CartModel({
            user:req.user._id,
            cartItems:[req.body]
        })
        calcTotalPrice (cart)
        await cart.save()
        res.json({message:"success",cart})

    }else{
        let item = isCartExist.cartItems.find(item => item.product == req.body.product)
        if(item){   
            item.quantity += req.body.quantity || 1
            if(item.quantity > product.stock) return next(new AppError('Sold Out',404))
        }
        if(!item) isCartExist.cartItems.push(req.body)
        calcTotalPrice (isCartExist)
        await isCartExist.save()    

        res.json({message:"success",cart:isCartExist})
    }
})

const updateCart = catchError(async(req,res,next)=>{

    let cart = await CartModel.findOne({user:req.user._id})
    let item = cart.cartItems.find(item => item.product == req.params.id)
    if(!item) return next(new AppError('this product is not found',404))
    item.quantity = req.body.quantity
    await cart.save()
    !cart || res.json({message:"success",cart})
})

const removeItemFromCart = catchError(async(req,res,next)=>{

    let cart = await CartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcTotalPrice(cart)
    await cart.save()
    cart || next(new AppError('this cart is not found',404))
    !cart || res.json({message:"success",cart})
})

const getLoggedUserCart = catchError(async(req,res,next)=>{
    let cart = await CartModel.findOne({user:req.user._id})
    !cart || res.json({message:"success",cart})
})

const clearUserCart = catchError(async(req,res,next)=>{
    let cart = await CartModel.findOneAndDelete({user:req.user._id})
    res.json({message:"success",cart})
})

const applyCoupon = catchError(async(req,res,next)=>{
    let coupon = await CouponModel.findOne({code:req.body.code,expires:{$gte:Date.now()}})
    if(!coupon) return next(new AppError('invalid coupon',404))
    let cart = await CartModel.findOne({user:req.user._id})
    cart.discount = coupon.discount
    await cart.save()
    res.json({message:"success",cart})
})

export {
    addCart,updateCart,removeItemFromCart,getLoggedUserCart,clearUserCart,applyCoupon
}
