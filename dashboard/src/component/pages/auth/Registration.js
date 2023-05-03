import {TextField, FormControlLabel, Checkbox, Button, Box , Alert} from "@mui/material";
import { useState } from "react";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from "../../../services/userauthapi";
import { StoreToken } from "../../../services/jwtlocalstorage";


const Registration = () => {
const navigate=useNavigate();
const [registerUser,{isLoading}]=useRegisterUserMutation()
const [error,setError]=useState({
        status:false,
        msg:"",
        type:""
}) 
const handlesubmit=async (e)=>{    
e.preventDefault();

const data=new FormData(e.target);
const actualdata={
    name:data.get('name'),
    email:data.get('email'),
    password:data.get('password'),
    password_confirmation:data.get('password_confirmation'),
    tc:data.get('tc')
}
if(actualdata.name && actualdata.email && actualdata.password && actualdata.tc !==null)
{
if(actualdata.password==actualdata.password_confirmation)
{
 
    const res=await registerUser(actualdata)
    // console.log(res);
// setError({ status:true, msg:"Registration Success", type:'success'})
if(res.data.status==="success"){
    //yaha token bhj rhe dashboard me k valid user ha ya ni
    StoreToken(res.data.token)
    navigate('/dashboard')
}
if(res.data.status==="failed"){
    setError({ status:true, msg:res.data.message, type:'warning'})     
}

//document.getElementById('registration-form').reset();
}
else{
    setError({ status:true, msg:"Password and Confirm password doesnot match", type:'warning'})   
}
//navigate('/')
}
else{

   setError({ status:true, msg:"Fill All Fields", type:'error'})
}
}

  return (
    <>
    <Box component="form" sx={{mt:1}} noValidate onSubmit={handlesubmit} id='registration-form'>
 <TextField required fullWidth margin='normal' id="name" label="Name" name="name"/>
 <TextField required fullWidth margin='normal' id="email" label="Email Address" name="email"/>
 <TextField required fullWidth margin='normal' id="password" label="Password" name="password" type="password"/>
 <TextField required fullWidth margin='normal' id="password_confirmation" label="Confirm Password" name="password_confirmation" type="password"/>
 {/* isme jo value={true} likha ye backend me column ha jiska name TC ha uski type bloean ha */}
 <FormControlLabel control={<Checkbox value={true} name="tc" id="tc" color="primary"/>} label="I Agree to Term And Conditions"/>     
         <Box textAlign='center'>
             <Button type='submit' variant='contained' color="secondary" sx={{mt:3,mt:2,px:5}}>
               Join
             </Button>
         </Box>
      
         {error.status ?<Alert severity={error.type}>{error.msg}</Alert>:''}
        
            </Box>
    </>
  )
}

export default Registration
