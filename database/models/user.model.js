import {model, Schema, Types }from "mongoose";

const UserSchema = new Schema({
   name:String,
   email:String,
   password:String,
   isBlocked:{
    type:Boolean,
    default:false
   },
   role:{
    type:String,
    enum:['admin','user'],
    default:'user'
   }

},{timestamps:true, versionKey:false})
const UserModel =model('User',UserSchema)


export default UserModel