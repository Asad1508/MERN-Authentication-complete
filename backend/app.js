import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import Connectdbs from './config/connectdb.js'
import userRoute from './routes/userRoute.js';
const app=express()
const port=process.env.PORT
//isko use kia takay front end se connect krty time error ko handle kre
app.use(cors())
//db connection
Connectdbs();
//q k API bna rhe tu ye likh rhe
app.use(express.json())

//load routes

app.use('/api/user',userRoute)

app.listen(port,()=>{
    console.log(`server lsitening at ${port}`);
})