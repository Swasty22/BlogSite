import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:'16kb'}))       //providing space limit and accepting json format datas
app.use(express.urlencoded({extended:true,limit:'16kb'}))             //accepting url datas and wwe using urlencoded inbuilt fn in express to encode the url and extended used to nesting of object and data limit is 16kb
app.use(express.static('public'))   //config to be used by public 
app.use(cookieParser())

import userRouter from './routes/user.route.js'






app.use('/api/v1/user',userRouter)
export default app