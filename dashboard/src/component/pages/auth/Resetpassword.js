import {Grid,Card,Typography,Tabs,Tab,Box,TextField,Button,Alert} from '@mui/material';
import {React, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../../services/userauthapi';
const Resetpassword = () => {
const navigate=useNavigate();
   //ye state bnai takay agr input fields empty submit kre tu error de wrna success
   const [error,setError]=useState({
    status:false,
    msg:"",
    type:""
}) 
const  [resetPassword,{isLoading}]=useResetPasswordMutation()
//yaha id aur token se useparams se get kr rhe
const {id,token}=useParams()
// agr ham khali submit button pr click kre tu load hota page tu ye function uss se prevent krta k na hu load
const handlesubmit=async(e)=>{    
e.preventDefault();

//iss code se form ka data  get kr rhe
const data=new FormData(e.target);
const actualdata={
//isme jo email likha ye form me name me jo likha wo ha
password:data.get('password'),
password_confirmation:data.get('password_confirmation'),
}
if(actualdata.password && actualdata.password_confirmation)
{
if(actualdata.password===actualdata.password_confirmation){
    //    isme jo id aur token likha ye oper useparams se get kr rhe
    //aur resetpassword api me send kr rhe 3inu ko 
    const res=await resetPassword({actualdata,id,token})
    console.log(res)
    if(res.data.status ==="success"){
//ye code iss liye q k jab ham submit krtay fill kr k tu jo enter kia fields me wo data usme he rehta
//hata k hona ye chahaye k jab submit pr click kre tu input fields b clear hojye tu ye code issi liye ha 
document.getElementById('password-reset-email-form').reset();
//ye wala code agr sari fill kr k submit kia tu neechy success login de ga
setError({ status:true, msg:"Password Recover...Redirecting you to Login Page", type:'success'})
//ye time dia k jab send pr click krde ga tu kitni dair bd navigate kre ga
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
    
     {/* isko is liye error.status me likha q k jese page refresh krty error deta k status false ha
     dosre ilfaz me ye code tab chle jab ham action pora krle like submit krdia ya input chor k submit kia form
     ko tu agr status na likhtay oper tu ye khud chal rha tha hata k hamne na he submit kia na he kuch
     */}
     {/* yaha ham error show krwaye gay ya success submit hone k bd */}
     {error.status ?<Alert sx={{mt:3}} severity={error.type}>{error.msg}</Alert>:''}
    
        </Box>
     </Grid>
 </Grid>
</>
)
}

export default Resetpassword