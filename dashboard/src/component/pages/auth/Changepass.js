import {Grid,Card,Typography,Tabs,Tab,Box,TextField,Button,Alert} from '@mui/material';
import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useChangeUserPasswordMutation } from '../../../services/userauthapi';
import { GetToken } from '../../../services/jwtlocalstorage';
const Changepass = () => {
const navigate=useNavigate();
     //ye state bnai takay agr input fields empty submit kre tu error de wrna success
   const [error,setError]=useState({
    status:false,
    msg:"",
    type:""
})
const [changeUserPassword]=useChangeUserPasswordMutation() 
const token=GetToken('token')
// agr ham khali submit button pr click kre tu load hota page tu ye function uss se prevent krta k na hu load
const handlesubmit= async(e)=>{    
e.preventDefault();

//iss code se form ka data  get kr rhe
const data=new FormData(e.target);
const actualdata={
//isme jo email likha ye form me name me jo likha wo ha
password:data.get('password'),
password_confirmation:data.get('password_confirmation')
}
if(actualdata.password && actualdata.password_confirmation)
{
if(actualdata.password==actualdata.password_confirmation){
  //isme jo token ha wo get kia oper jwtlocalstorage se
  const res=await changeUserPassword({actualdata,token})  
if(res.data.status==="success")
{
 
//ye code iss liye q k jab ham submit krtay fill kr k tu jo enter kia fields me wo data usme he rehta
//hata k hona ye chahaye k jab submit pr click kre tu input fields b clear hojye tu ye code issi liye ha 
document.getElementById('password-change-form').reset();
//ye wala code agr sari fill kr k submit kia tu neechy success login de ga
setError({ status:true, msg:"Password Updated", type:'success'})
//ye time dia k jab send pr click krde ga tu kitni dair bd navigate kre ga
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