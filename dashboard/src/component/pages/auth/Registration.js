import {TextField, FormControlLabel, Checkbox, Button, Box , Alert} from "@mui/material";
import { useState } from "react";
import React from 'react'
import { useNavigate } from 'react-router-dom';
//isme jo  useRegisterUserMutation likha ye 1 api ko import kia takay data bhj ske api ko front end form ka takay wo
//agay backend ko bhj de
import { useRegisterUserMutation } from "../../../services/userauthapi";
import { StoreToken } from "../../../services/jwtlocalstorage";


const Registration = () => {
    //usenavigate ko redirect krne k liye use kia yaha takay jab submit kre tu kaha jana chahye
const navigate=useNavigate();
//isme jo register likha ye hamne userauthapi me endpoint bnaya iska
const [registerUser,{isLoading}]=useRegisterUserMutation()
//ye state bnai takay agr input fields empty submit kre tu error de wrna success
const [error,setError]=useState({
    // yaha status ko false kia q k jab page regresh hota tu auto call hojata tha alert 
        status:false,
        msg:"",
        type:""
}) 
// agr ham khali submit button pr click kre tu load hota page tu ye function uss se prevent krta k na hu load
const handlesubmit=async (e)=>{    
e.preventDefault();

//iss code se form ka data  get kr rhe
const data=new FormData(e.target);
//iss actualdata me jo 1st name,email,password aur baki b likha ye send horha schema1usercontroller.js me 
//phir waha b req.body me name,email,password aur baki b lihne ese he
const actualdata={
    //isme jo quotation me likha ye form me name me jo likha wo ha
    name:data.get('name'),
    email:data.get('email'),
    password:data.get('password'),
    password_confirmation:data.get('password_confirmation'),
    tc:data.get('tc')
}
//ye dekhne k liye k data empty tu ni fill kr k sumbit kr rha
if(actualdata.name && actualdata.email && actualdata.password && actualdata.tc !==null)
{
    //ye check kr rha k new password aur confirm password match kr rhe ya ni
if(actualdata.password==actualdata.password_confirmation)
{
    //iska matlab jab join/submit pr click kre gay tu registeruser() ha usko parameter k
    //taur pr actualdata pass hoga aur ye userauthapi me registeruser me jye ga user me ajye ga
    //ye hit hone pr API ko call kr rhe jo k ha userauthapi.js
    const res=await registerUser(actualdata)
    // console.log(res);
// setError({ status:true, msg:"Registration Success", type:'success'})
//agr status backend se success hojata tu dashboard me navigate kre    
if(res.data.status==="success"){
    //yaha token bhj rhe dashboard me k valid user ha ya ni
    StoreToken(res.data.token)
    navigate('/dashboard')
}
if(res.data.status==="failed"){
    //isme res.data.message backend se arha agr ststus failed hoga tab ye chle ga 
    setError({ status:true, msg:res.data.message, type:'warning'})     
}

//ye code iss liye q k jab ham submit krtay fill kr k tu jo enter kia fields me wo data usme he rehta
//hata k hona ye chahaye k jab submit pr click kre tu input fields b clear hojye tu ye code issi liye ha 
//document.getElementById('registration-form').reset();
}
else{
    setError({ status:true, msg:"Password and Confirm password doesnot match", type:'warning'})   
}
//ye page ko navigate k liye use kia k 
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
         {/* isko is liye error.status me likha q k jese page refresh krty error deta k status false ha
         dosre ilfaz me ye code tab chle jab ham action pora krle like submit krdia ya input chor k submit kia form
         ko tu agr status na likhtay oper tu ye khud chal rha tha hata k hamne na he submit kia na he kuch
         */}
         {error.status ?<Alert severity={error.type}>{error.msg}</Alert>:''}
        
            </Box>
    </>
  )
}

export default Registration