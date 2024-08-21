import {model, Schema, Types }from "mongoose";

const CouponSchema = new Schema({
 code:{
    type:String,
    unique:true,
    required:true
 },
 expires:Date,
 discount:Number

},{timestamps:true, versionKey:false})
const CouponModel =model('Coupon',CouponSchema)

export default CouponModel