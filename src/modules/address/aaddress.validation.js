import Joi from 'joi';

const addAddressValidation = Joi.object({
    street:Joi.string().required(),
    city:Joi.string().required(),
    phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required()
  
}).unknown(true);

const removeAddressValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
}).unknown(true);



export{
    addAddressValidation,removeAddressValidation
}