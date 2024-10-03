import Joi from 'joi';

const createReviewValidation = Joi.object({
    comment:Joi.string().required(),
    product:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    rate:Joi.string().required()
  
}).unknown(true);

const getSpecificReviewValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
}).unknown(true);


const updateReviewValidation = Joi.object({
  comment:Joi.string().required(),
  id:Joi.string().hex().length(24).required(),
  rate:Joi.string().required()


}).unknown(true);

const deleteReviewValidation = Joi.object({
  id:Joi.string().hex().length(24).required()

}).unknown(true);



export{
  createReviewValidation,getSpecificReviewValidation,updateReviewValidation,deleteReviewValidation
}