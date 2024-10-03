import {model, Schema, Types }from "mongoose";

const BrandSchema = new Schema({
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
    logo:String,
   createdBy:{
    type: Types.ObjectId,
    ref: 'User'
  }

},{timestamps:true, versionKey:false})

BrandSchema.post('init',function(doc) {
  doc.logo = process.env.BASE_URL + "brands/" + doc.logo
  
  })
const BrandModel =model('Brand',BrandSchema)


export default BrandModel