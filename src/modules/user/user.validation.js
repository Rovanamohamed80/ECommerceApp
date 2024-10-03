import Joi from 'joi';

const signUpVal =Joi.object({
  name:Joi.string().min(2).max(20).required(),
  email:Joi.string().email().required(),
  password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{6,40}$/).required()

}).unknown(true);

const getSpecificUserValidation = Joi.object({
  id:Joi.string().hex().length(24).required()
}).unknown(true);


const updateUserValidation = Joi.object({
  name:Joi.string().min(2).max(20),
  role:Joi.string().valid('user', 'admin').default('user'),
  id:Joi.string().hex().length(24).required()

}).unknown(true);

const deleteUserValidation = Joi.object({
  id:Joi.string().hex().length(24).required()

}).unknown(true);



export{
  signUpVal,getSpecificUserValidation,updateUserValidation,deleteUserValidation
}
