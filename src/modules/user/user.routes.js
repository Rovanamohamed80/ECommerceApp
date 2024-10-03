import { Router } from "express";

import { addUser, allUsers, deleteUser, getUser, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { deleteUserValidation, getSpecificUserValidation, signUpVal, updateUserValidation } from "./user.validation.js";
import { validate } from "../../middleware/validate.js";


const UserRouter =Router()

UserRouter.post('/',checkEmail,validate(signUpVal),addUser)
UserRouter.get('/',allUsers)
UserRouter.get('/:id',validate(getSpecificUserValidation),getUser)
UserRouter.put('/:id',validate(updateUserValidation),updateUser)
UserRouter.delete('/:id',validate(deleteUserValidation),deleteUser)



export default UserRouter