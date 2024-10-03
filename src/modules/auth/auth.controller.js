import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js"
import UserModel from "../../../database/models/user.model.js"
import { AppError } from "../../utils/appError.js"


const signup = catchError(async (req,res)=>{
    let user = new UserModel(req.body)
    await user.save()
    let token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    res.json({message:"success",token})
})



const signin = (async(req,res,next)=>{
  let user = await UserModel.findOne({email:req.body.email})
    if(user && bcrypt.compareSync(req.body.password,user.password)){
      let token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
      return res.status(201).json({message: "user login successfully",token:token})
    }
    next(new AppError('incorrect email or password',401))
})

const changeUserPassword = (async(req,res,next)=>{
    let user = await UserModel.findOne({email:req.body.email})
      if(user && bcrypt.compareSync(req.body.oldPassword,user.password)){
        await UserModel.findOneAndUpdate({email:req.body.email},{password:req.body.newPassword,passwordChangedAt:Date.now()})
        let token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        return res.status(201).json({message: "user login successfully",token:token})
      }
      next(new AppError('incorrect email or password'),401)
})

const protectedRoutes = (async(req,res,next)=>{
    let {token} = req.headers ;
    let userPayload = null;
    if(!token) return next(new AppError('token not provided',401))
     jwt.verify(token,'EcommerceApp',(err,payload)=>{
     if(err) return next(new AppError(err,401))
        userPayload = payload
    })
    let user = await UserModel.findById(userPayload.userId)
    if(!user) return next(new AppError('user is not found',401))
    if(user.passwordChangedAt){
    let time = parseInt(user.passwordChangedAt.getTime()/1000)
    if(time > userPayload.iat) return next(new AppError('invalid token.....login again',401))
    }
    req.user = user
    next()
})

const allowedTo = (...roles) =>{
  return (async(req,res,next)=>{
  if(roles.includes(req.user.role))
    return next()
 return next(new AppError('you not authorized to access this endpoint',401))
  })
}




export{
signup,signin,changeUserPassword,protectedRoutes,allowedTo
}