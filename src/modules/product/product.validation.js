import Joi from 'joi';



const updateProductValidation = Joi.object({

  title:Joi.string(),
  id:Joi.string().hex().length(24),
  price:Joi.string(),
  priceAfterDiscount:Joi.string(),
  stock:Joi.string(),
  category:Joi.string(),
  suncategory:Joi.string(),
  rateAvg:Joi.string(),
  rateCount:Joi.string()
 
}).unknown(true)

const deleteProductValidation = Joi.object({
  id:Joi.string().hex().length(24).required()

}).unknown(true);






export{
  updateProductValidation,deleteProductValidation
}