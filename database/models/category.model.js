import {model, Schema, Types }from "mongoose";

const CategorySchema = new Schema({
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
      lowercase:true,
      unique:[true,'name is required']
    },
    image:String,
   createdBy:{
    type: Types.ObjectId,
    ref: 'User'
  }
   
},{timestamps:true, versionKey:false})

CategorySchema.post('init',function(doc) {
doc.image = process.env.BASE_URL + "categories/" + doc.image

})

const CategoryModel =model('Category',CategorySchema)


export default CategoryModel