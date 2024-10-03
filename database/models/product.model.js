import {model, Schema, Types }from "mongoose";

const ProductSchema = new Schema({
    title: {
      type: String,
      unique:[true,'title is required'],
      trim:true,
      required: true,
      minLength:[2,'too short title product']
    },
    slug: {
      type: String,
      required: true,
      lowercase:true
    },
    description:{
      type: String,
      required: true,
      minLength: 30,
      maxLength: 2000  
    },
    imageCover:String,
    images:[String],
    price:{
        type:Number,
        required:true,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:0
    },
    sold:Number,
    stock:{
        type:Number,
        min:0
    },
    category:{
        type: Types.ObjectId,
        ref: 'Category'
    },
    subcategory:{
        type: Types.ObjectId,
        ref: 'SubCategory'
    },
    brand:{
        type: Types.ObjectId,
        ref: 'Brand'
    },
    rateAvg:{
        type:Number,
        min:0,
        max:5
    },
    rateCount:Number,
   createdBy:{
    type: Types.ObjectId,
    ref: 'User'
  }

},{timestamps:true, versionKey:false , toJSON: { virtuals: true } })

ProductSchema.virtual('myReviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product'
});

ProductSchema.pre("findOne",function() {
  this.populate('myReviews')
 })
  

ProductSchema.post('init',function(doc) {
  if(doc.imageCover) doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover
  if(doc.images) doc.images = doc.images.map(img=> process.env.BASE_URL + "products/" + img)
  
  })
  
  
const ProductModel =model('Product',ProductSchema)


export default ProductModel