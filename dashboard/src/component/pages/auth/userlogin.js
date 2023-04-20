import {Box, Alert, Button , TextField, CircularProgress} from '@mui/material';
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLoginUserMutation } from '../../../services/userauthapi';
import { GetToken, StoreToken } from '../../../services/jwtlocalstorage';
import { useDispatch } from 'react-redux';
import { setUsertoken } from '../../../features/routeauthslice';
const Userlogin = () => {
//usenavigate ko redirect krne k liye use kia yaha takay jab submit kre tu kaha jana chahye
const navigate=useNavigate();
//ye state bnai takay agr input fields empty submit kre tu error de wrna success
const [error,setError]=useState({
        status:false,
        msg:"",
        type:""
}) 
//isme jo loginuser 
const [loginUser,{isLoading}]=useLoginUserMutation()
// agr ham khali submit button pr click kre tu load hota page tu ye function uss se prevent krta k na hu load
const handlesubmit=async (e)=>{    
e.preventDefault();

//iss code se form ka data  get kr rhe
const data=new FormData(e.target);
const actualdata={
    //isme jo email likha ye form me name me jo likha wo ha
    email:data.get('email'),
    password:data.get('password'),
}
if(actualdata.email && actualdata.password){
const res=await loginUser(actualdata)

  //yaha token bhj rhe dashboard me k valid user ha ya ni
  //agr status backend se success hojata tu dashboard me navigate kre    
if(res.data.status === "Success"){
  //yaha token bhj rhe dashboard me k valid user ha ya ni
  navigate('/dashboard')
  StoreToken(res.data.token)
  
}
  if(res.data.status === "failed"){
    //isme res.data.message backend se arha agr ststus failed hoga tab ye chle ga 
    setError({ status:true, msg:res.data.message, type:'warning'})     
}
//ye code iss liye q k jab ham submit krtay fill kr k tu jo enter kia fields me wo data usme he rehta
//hata k hona ye chahaye k jab submit pr click kre tu input fields b clear hojye tu ye code issi liye ha 
// document.getElementById('login-form').reset();
// //ye wala code agr sari fill kr k submit kia tu neechy success login de ga
// setError({ status:true, msg:"Login Success", type:'success'})
// //ye code 3 sec bd redirect krde ga dashboard page pr ye function uske liye ha
// setTimeout(()=>{
//     navigate('/dashboard')
// },3000)
}
else{

   setError({ status:true, msg:"Fill All Fields", type:'error'})
}
}
//yaha token get kr k snd kr rhe routerauthslice.js me takay agr user login ha aur dashboard me ha
//tu dashboard me hone pr wo url me login likhay tu wapis dashboard me ajye issi trh token se verify hoga k 
//login ha tu dashbard me he rhe
let token=GetToken('token')
const dispatch=useDispatch()
useEffect(()=>{
  //isme jo 1st token ha wo routeauthslice.js se arha aur 2nd wala token wo ha jo let kia token get kr k
dispatch(setUsertoken({token:token}))
},[token,dispatch])
  return (
    <>
    <Box component="form" sx={{mt:1}} noValidate onSubmit={handlesubmit} id='login-form'>
        
<TextField required fullWidth margin='normal' id="email" label="Email Address" name="email"/>
<TextField required fullWidth margin='normal' id="password" label="Password" name="password" type="password"/>
 <Box textAlign='center'>
   {/* loading agr true ha tu circularbar dikhao loading wala wrna button dikhao */}
   {isLoading ? <CircularProgress/>:
     <Button type='submit' variant='contained' sx={{mt:3,mt:2,px:5}}>
       Login
     </Button>}
 </Box>
 <NavLink to='/Sendpassresetemail'>Forget Password</NavLink>
 {/* isko is liye error.status me likha q k jese page refresh krty error deta k status false ha
 dosre ilfaz me ye code tab chle jab ham action pora krle like submit krdia ya input chor k submit kia form
 ko tu agr status na likhtay oper tu ye khud chal rha tha hata k hamne na he submit kia na he kuch
 */}
 {error.status ?<Alert severity={error.type}>{error.msg}</Alert>:''}

    </Box>
    </>
  )
}

export default Userlogin