import Joi from 'joi';

const addToWishlistValidation = Joi.object({
    product:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  
}).unknown(true);

const getSpecificsubCategoryValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
}).unknown(true);



const deleteFromWishlistValidation = Joi.object({
  id:Joi.string().hex().length(24).required()

}).unknown(true);



export{
  addToWishlistValidation,deleteFromWishlistValidation
}