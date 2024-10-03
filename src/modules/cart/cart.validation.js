import Joi from 'joi';

const addToCartValidation = Joi.object({
    product:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    quantity:Joi.number().required()
  
}).unknown(true);

const getSpecificCategoryValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
}).unknown(true);

const updateCartValidation = Joi.object({
  id:Joi.string().hex().length(24).required(),
  quantity:Joi.number().required()
}).unknown(true);

const deleteSpecificItemValidation = Joi.object({
  id:Joi.string().hex().length(24).required()

}).unknown(true);


const applyCouponValidation = Joi.object({
  code:Joi.string().required()

}).unknown(true);



export{
  addToCartValidation,updateCartValidation,deleteSpecificItemValidation,applyCouponValidation
}