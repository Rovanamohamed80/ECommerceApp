import Joi from 'joi';

const createCouponValidation = Joi.object({
    code:Joi.string().required(),
    expires:Joi.date().required(),
    discount:Joi.string().required()
  
}).unknown(true);

const getSpecificCouponValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
}).unknown(true);


const updateCouponValidation = Joi.object({
  code:Joi.string(),
  id:Joi.string().hex().length(24).required(),
  expires:Joi.date(),
  discount:Joi.string()


}).unknown(true);

const deleteCouponValidation = Joi.object({
  id:Joi.string().hex().length(24).required()

}).unknown(true);



export{
  createCouponValidation,getSpecificCouponValidation,updateCouponValidation,deleteCouponValidation
}