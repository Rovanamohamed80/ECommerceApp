import Joi from 'joi';

const createsubCategoryValidation = Joi.object({
    name:Joi.string().required(),
    category:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  
}).unknown(true);

const getSpecificsubCategoryValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
}).unknown(true);


const updatesubCategoryValidation = Joi.object({
  name:Joi.string().required(),
  id:Joi.string().hex().length(24).required()

}).unknown(true);

const deletesubCategoryValidation = Joi.object({
  id:Joi.string().hex().length(24).required()

}).unknown(true);



export{
  createsubCategoryValidation,getSpecificsubCategoryValidation,updatesubCategoryValidation,deletesubCategoryValidation
}