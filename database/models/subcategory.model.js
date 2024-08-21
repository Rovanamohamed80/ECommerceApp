import {model, Schema, Types }from "mongoose";

const SubCategorySchema = new Schema({
    name: {
      type: String,
      unique:[true,'name is required'],
      trim:true,
      required: true,
      minLength:[2,'too short name category']
    },
    slug: {
      type: String,
      required: true,
      lowercase:true
    },
    category:{
    type: Types.ObjectId,
    ref: 'Category'
  },
   createdBy:{
    type: Types.ObjectId,
    ref: 'User'
  }
},{timestamps:true, versionKey:false})
const SubCategoryModel =model('SubCategory',SubCategorySchema)


export default SubCategoryModel