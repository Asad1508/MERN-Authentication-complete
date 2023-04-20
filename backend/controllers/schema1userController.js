import Usermodel from "../models/schema1user.js";
//hashing k liye import kr rhe
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/emailconfig.js";

class UserController{
    static userRegistration=async (req,res)=>{

        const {name,email,password,password_confirmation,tc}=req.body
        //isme dekh rhe k agr use registration kr rha tu dekhy jis mail se kr rha wo alrady exists tu ni
        //aur isme jo 1st email likha wo database me majood email ka name ha aur 2nd email jo wo name field wali
        //jo new user enter kre ga
        //dosre ilfaz me ye code dekhne k liye k pehly se registered ha ya ni email
        const user=await Usermodel.findOne({email:email})
        //agr mail match kr jati tu msg de k Email already exits    
        if(user)
        {
            res.send({"status":"failed","message":"Try another Email already exsits"})
        }
        else{
            //sab se pehly dekhy k fileds empty tu ni
            if(name && email && password && password_confirmation && tc)
            {
            
             if(password===password_confirmation){
                try {         
        //sab kuch clear hone k bd data send krna database me
        const salt=await bcrypt.genSalt(10)
        const hashpassword=await bcrypt.hash(password,salt)
        const doc =new Usermodel({
            
        //isme jo 2nd name jo likha wo ha jo user enter kre ga aur 2nd name db k field ka naam ha 
            name:name,
            email:email,
            password:hashpassword,
            tc:tc
        })
        await doc.save()
        //jo user save howa usko find kro abhi aur jwt token bnao uska
        const saved_user=await Usermodel.findOne({email:email})
        //generating jwt token
        //isme jo saved_user ha wo ha jo abhi save howa aur _id jo db me field ha isme expiresIn 1 property ha
        const token=jwt.sign({userid:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
        //jab ham postman me save kr rhe thay tu data load hoi ja rha tha tu uss loading ko
        // daur krne k liye ye likhay gay
        //jo token bnaya client ko bhj du 
        res.send({"status":"success","message":"Registration Successfull","token":token})
            } catch (error) {
                res.send({"status":"failed","message":"Password and Confirm Password doesnot Match"})
            }
             }
             else{
                res.send({"status":"failed","message":"Password and Confirm Password doesnot Match"})
             }
            }
            else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }
    }
//user login
static login=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(email && password){
        //ye code dekh rha k email registered ha ya ni
        const user= await Usermodel.findOne({email:email})
        //ye dekh rha k user ha ya ni 
        if(user !=null)
        {
        //isme password ko db walay password se match kr rhe yaha user.password iss liye likha q k
        //isme hashpassword save ha jo k db me store howa tha 
          const isMatch=await bcrypt.compare(password,user.password)  
         //isme user.email yani db wali mail == ha ya ni email k aur password match kr rha ya ni
          if((user.email===email) && isMatch)
          {
            const token=jwt.sign({userid:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
            
            res.send({"status":"Success","message":"Login Success","token":token})     
          }
          else{
            res.send({"status":"failed","message":"Email or Password is not valid"})      
          }   
        }
        else{
            res.send({"status":"failed","message":"You are not registered User"})    
        }
    }
        else{
        res.send({"status":"failed","message":"All fields are required"})    
        }
    } catch (error) {
        res.send({"status":"failed","message":"Unable to Login"})    
    }
}
//Change Password
static changepassword=async (req,res)=>{
const {password,password_confirmation}=req.body
if(password&&password_confirmation){
if(password !==password_confirmation)
{
    res.send({"status":"failed","message":"Password and Confirm Password doesnot Match"})
}
else{
    const salt=await bcrypt.genSalt(10)
    const newhashpassword=await bcrypt.hash(password,salt)
    await Usermodel.findByIdAndUpdate(req.user._id,{$set:{password:newhashpassword}})
    res.send({"status":"success","message":"Password changed successfully"}) 
}
}
else{
    res.send({"status":"failed","message":"All fields are required"})    
    
}
}
//ye jo looged user ha uska data get kr rhe
static loggedUser=async (req,res)=>{
    res.send({"user":req.user})
}
//ye code yaha agr user password bhol gya tu reset kr skta mail pr link aye ga password reset ka
static senduserpasswordresetemail=async (req,res)=>{
    const {email}=req.body
    if(email)
    {
//      find kre k jo email enter ki user ne pasword reset k liye wo db me ha ya ni yani register ha ya ni
//isme jo 1st email likha wo db me ha name aur 2nd email 
      const user=await Usermodel.findOne({email:email})
     
      if(user){
      
      const secret=user._id + process.env.JWT_SECRET_KEY    
      const token=jwt.sign({userid:user._id},secret,{expiresIn:'15m'})
      const link=`http://localhost:3000/api/user/reset/${user._id}/${token}`
       console.log(link)   
      //send email to change password by transporter

      let info=await transporter.sendMail({
          //isme jo EMAIL_FROM ha .env file me likha takay secure b rhe
          
          from:process.env.EMAIL_FROM,
          to:user.email,
          subject:"password reset link",
          html:`<a href=${link}>Click Here</a> to Reset your password`
          
      })
      
      res.send({"status":"success","message":"Password reset...Email sent..please check your email"})     
    }
      else{
        res.send({"status":"failed","message":"Email doesnot Exists"})   
      }
    }
    else{
        res.send({"status":"failed","message":"Email field is required"})           
    }
}
//ye code submit pr click hone kd chle password ko update krne k liye
//yani jo link aye ga mail pr uss pr click hone k bd jab user password update kre ga tu yaha se update hoga

static userpasswordreset=async (req,res)=>{
    const {password,password_confirmation}=req.body
    //ye wala id wo ha jo link se aya 
    //isme params se id aur token nikal rha
    const {id, token}=req.params
    //isme wo user aya jisne link pr click kr k password change kia jisne 
    //reset krna tha pass wo reset hokr yaha aya 
    const user =await Usermodel.findById(id)
    //yaha new token bna rhe uska jisne link pr click kr password new bnaya
    const new_token=user._id+ process.env.JWT_SECRET_KEY
    //yaha token verify kr rhe old aur new ko
    try {
        jwt.verify(token,new_token)
    if(password&&password_confirmation){
        if(password!==password_confirmation)
        {
            res.send({"status":"failed","message":"New password and confirm new password doesnot match"})   
        }
        else{
            const salt=await bcrypt.genSalt(10)
            const newhashpassword=await bcrypt.hash(password,salt)
            await Usermodel.findByIdAndUpdate(user._id,{$set:{password:newhashpassword}})
    res.send({"status":"success","message":"Password Reset successfully"}) 
        }
     }
     else{
        res.send({"status":"failed","message":"All Fields Are Required"})   
     }

    } catch (error) {
        res.send({"status":"failed","message":"Invalid Token"})   
    }
}
}
export default UserController