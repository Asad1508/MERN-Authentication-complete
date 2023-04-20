import  Jwt  from "jsonwebtoken";
import Usermodel from "../models/schema1user.js";

//ye middleware bnaya k dekhy  k jo userpassword change kr rha wo authenticate ha b ya ni
//ye middleware tab use krna jab esa feature access krne ko de rhe jab authentication zrori hu
var checkuserauth= async (req,res,next)=>{
    let token
    //req.headers me se authorization ko nikal rhe
    const {authorization}=req.headers

        //yaha ham check kr rhe hmra token jis format me hona chaye usme ha ya ni
        //pehly ham dekhy gay k authorization me koi value ha ya ni aur startwith bearer ha ya ni
        if(authorization && authorization.startsWith('Bearer'))
        {
            try {
//yaha ham token split kr rhe 
//ye authorization.split return krta 1 bearer aur 1 token jo[1] me rhe ga wo token hoga usko token me stroe kr rhe
            //get token from header  
            //bearer aur token jo aye ga usko split kia space dekr yaha 0 pr bearer chala aye ga aur 1 pr token
            token=authorization.split(' ')[1]
            //verify token
            const {userid}=Jwt.verify(token,process.env.JWT_SECRET_KEY)

            //get user from token
            //ye code password k ilawa sab kuch req.user me de de ga jisko agay use kr paye gay
            req.user=await Usermodel.findById(userid).select('-password')
            next()
            //ye next forward kre ga changepassword me
            } catch (error) {
                res.send({"status":"failed","message":"Unauthorized User"})    
            }
        }
        if(!token)
        {
            res.send({"status":"failed","message":"Unauthorized User, No token"})    
        }
    }

export default checkuserauth