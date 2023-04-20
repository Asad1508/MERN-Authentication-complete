import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

//iss transporter ka use kr k email snd kre gay 
//configuration k liye use krty issay 
let transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:false,  //true for 465 or for other ports
    auth:{
        user:process.env.EMAIL_USER, //admin gmail id
        pass:process.env.EMAIL_pass,  //admin gmail password
    }
})
export default transporter