import {model, Schema, Types }from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema({
   name:String,
   email:String,
   password:String,
   isBlocked:{
    type:Boolean,
    default:false
   },
   confirmEmail:{
      type:Boolean,
      default:false
     },
   role:{
    type:String,
    enum:['admin','user'],
    default:'user'
   },
   passwordChangedAt:Date,
   wishlist:[{type:Types.ObjectId,ref:'Product'}],
   addresses:[{
      city:String,
      phone:String,
      street:String
   }]

},{timestamps:true, versionKey:false})

UserSchema.pre('save', function() {
   this.password = bcrypt.hashSync(this.password,8);
})

UserSchema.pre('findOneAndUpdate', function() {
  if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,8);
})


const UserModel =model('User',UserSchema)
export default UserModel