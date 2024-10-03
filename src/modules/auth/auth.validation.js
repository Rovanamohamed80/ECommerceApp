import Joi from 'joi';

const signUpVal =Joi.object({
  name:Joi.string().min(2).max(20).required(),
  email:Joi.string().email().required(),
  password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{6,40}$/).required(),
  role:Joi.string().valid('user', 'admin').default('user'),

}).unknown(true);

const signInVal =Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().required()

}).unknown(true);


const changePassValidation = Joi.object({
  email:Joi.string().email().required(),
  oldPassword:Joi.string().required(),
  newPassword:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{6,40}$/).required()

}).unknown(true);








export{
  signUpVal,signInVal,changePassValidation
}