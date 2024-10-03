import { Router } from "express";
import { changeUserPassword, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validate.js";
import { changePassValidation, signInVal, signUpVal } from "./auth.validation.js";

const authRouter =Router()

authRouter.post('/signup',validate(signUpVal),checkEmail,signup)
authRouter.post('/signin',validate(signInVal),signin)
authRouter.patch('/changepassword',validate(changePassValidation),changeUserPassword)

export default authRouter