import Joi from 'joi';

const createOrderValidation = Joi.object({
  id:Joi.string().hex().length(24).required(),
  shippingAddress: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
  }).required(),
}).unknown(true);


export{
  createOrderValidation
}