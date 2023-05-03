import {Grid,Card,Typography,Tabs,Tab,Box,TextField,Button,Alert} from '@mui/material';
import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useChangeUserPasswordMutation } from '../../../services/userauthapi';
import { GetToken } from '../../../services/jwtlocalstorage';
const Changepass = () => {
const navigate=useNavigate();
   const [error,setError]=useState({
    status:false,
    msg:"",
    type:""
})
const [changeUserPassword]=useChangeUserPasswordMutation() 
const token=GetToken('token')
const handlesubmit= async(e)=>{    
e.preventDefault();

const data=new FormData(e.target);
const actualdata={
password:data.get('password'),
password_confirmation:data.get('password_confirmation')
}
if(actualdata.password && actualdata.password_confirmation)
{
if(actualdata.password==actualdata.password_confirmation){
  const res=await changeUserPassword({actualdata,token})  
if(res.data.status==="success")
{
 
document.getElementById('password-change-form').reset();
setError({ status:true, msg:"Password Updated", type:'success'})
setTimeout(()=>{
    navigate('/login')    
},3000)

}
if(res.data.status==="failed")
{
  setError({status:true, msg:res.data.message, type:'error'})
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
    <Box container sx={{display:'flex', flexDirection:'column', flexWrap:'wrap', maxWidth:600, mx:4}}>
      <h1>Change Password</h1>
      <Box component="form" onSubmit={handlesubmit} noValidate sx={{mt:1}} id="password-change-form">
<TextField required fullWidth margin='normal' id="password" label="New Password" name="password" type="password"/>
<TextField required fullWidth margin='normal' id="password_confirmation" label="New Confirm Password" name="password_confirmation" type="password"/>
<Box textAlign='center'>
<Button  type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Update</Button>  
</Box>
{error.status ?<Alert sx={{mt:3}} severity={error.type}>{error.msg}</Alert>:''}
      </Box>
    </Box>
    </>
  )
}

export default Changepass
