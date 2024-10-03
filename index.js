import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { AppError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

dbConnection
bootstrap(app)

app.use(globalError)
process.on('unhandledRejection',(err)=>{
    console.log('error',err);
    
})

app.use('*',(req,res,next)=>{
    next(new AppError(`route not found ${req.originalUrl}`,404))
})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))