import {Box, Alert, Button , TextField, CircularProgress} from '@mui/material';
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLoginUserMutation } from '../../../services/userauthapi';
import { GetToken, StoreToken } from '../../../services/jwtlocalstorage';
import { useDispatch } from 'react-redux';
import { setUsertoken } from '../../../features/routeauthslice';
const Userlogin = () => {
const navigate=useNavigate();
const [error,setError]=useState({
        status:false,
        msg:"",
        type:""
}) 
//isme jo loginuser 
const [loginUser,{isLoading}]=useLoginUserMutation()
const handlesubmit=async (e)=>{    
e.preventDefault();

const data=new FormData(e.target);
const actualdata={
    email:data.get('email'),
    password:data.get('password'),
}
if(actualdata.email && actualdata.password){
const res=await loginUser(actualdata)

if(res.data.status === "Success"){
  navigate('/dashboard')
  StoreToken(res.data.token)
  
}
  if(res.data.status === "failed"){
    setError({ status:true, msg:res.data.message, type:'warning'})     
}

// setError({ status:true, msg:"Login Success", type:'success'})
// setTimeout(()=>{
//     navigate('/dashboard')
// },3000)
}
else{

   setError({ status:true, msg:"Fill All Fields", type:'error'})
}
}

let token=GetToken('token')
const dispatch=useDispatch()
useEffect(()=>{
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

 {error.status ?<Alert severity={error.type}>{error.msg}</Alert>:''}

    </Box>
    </>
  )
}

export default Userlogin
