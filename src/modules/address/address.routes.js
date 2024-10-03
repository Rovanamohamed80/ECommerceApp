import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAddress, getLoggedUserAddresses, removeAddress } from "./address.controller.js";
import { addAddressValidation, removeAddressValidation } from "./aaddress.validation.js";
import { validate } from "../../middleware/validate.js";


const AddressRouter =Router()

AddressRouter.patch('/',protectedRoutes,allowedTo('user'),validate(addAddressValidation),addAddress)
AddressRouter.delete('/:id',protectedRoutes,allowedTo('user','admin'),validate(removeAddressValidation),removeAddress)
AddressRouter.get('/',protectedRoutes,allowedTo('user'),getLoggedUserAddresses)

export default AddressRouter