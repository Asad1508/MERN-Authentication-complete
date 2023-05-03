import {Grid,Card,Typography,Tabs,Tab,Box,TextField,Button,Alert} from '@mui/material';
import {React, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../services/userauthapi';
const Resetpassword = () => {
const navigate=useNavigate();
   const [error,setError]=useState({
    status:false,
    msg:"",
    type:""
}) 
const  [resetPassword,{isLoading}]=useResetPasswordMutation()
//yaha id aur token se useparams se get kr rhe
const {id,token}=useParams()
const handlesubmit=async(e)=>{    
e.preventDefault();

const data=new FormData(e.target);
const actualdata={
password:data.get('password'),
password_confirmation:data.get('password_confirmation'),
}
if(actualdata.password && actualdata.password_confirmation)
{
if(actualdata.password===actualdata.password_confirmation){

    const res=await resetPassword({actualdata,id,token})
    console.log(res)
    if(res.data.status ==="success"){
document.getElementById('password-reset-email-form').reset();
setError({ status:true, msg:"Password Recover...Redirecting you to Login Page", type:'success'})
setTimeout(()=>{
    navigate('/')    
},3000)
}
if(res.data.status==="failed")
{
    setError({status:true, msg:res.data.message, type:'warning'})
}
}
else{
    setError({status:true, msg:"password and confirm doesnot match", type:'warning'})
}
}
else{

setError({ status:true, msg:"All Fields Are Required", type:'error'})
}
}

return (
<>
 <Grid container justifyContent={'center'}>
     <Grid item sm={6} xs={12}>
         <h1>Reset Password</h1>
     <Box component="form" sx={{mt:1}} noValidate onSubmit={handlesubmit} id='password-reset-email-form'>
 <TextField required fullWidth margin='normal' id="password" label="New Password" name="password" type="password"/>
 <TextField required fullWidth margin='normal' id="password_confirmation" label="New Confirm Password" name="password_confirmation" type="password"/>
     
     <Box textAlign='center'>
         <Button type='submit' variant='contained' sx={{mt:3,mt:2,px:5}}>Send</Button>
     </Box>
    
     {error.status ?<Alert sx={{mt:3}} severity={error.type}>{error.msg}</Alert>:''}
    
        </Box>
     </Grid>
 </Grid>
</>
)
}

export default Resetpassword
