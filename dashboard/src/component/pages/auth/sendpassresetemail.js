import {Grid, TextField, Button, Box, Alert} from '@mui/material';
import {React, useState }from 'react'
import { useSendPasswordResetEmailMutation } from '../../../services/userauthapi';
const Sendpassresetemail = () => {

    //ye state bnai takay agr input fields empty submit kre tu error de wrna success
    const [error,setError]=useState({
        status:false,
        msg:"",
        type:""
}) 
const [sendPasswordResetEmail,{isLoading}]=useSendPasswordResetEmailMutation()
// agr ham khali submit button pr click kre tu load hota page tu ye function uss se prevent krta k na hu load
const handlesubmit= async (e)=>{    
e.preventDefault();

//iss code se form ka data  get kr rhe
const data=new FormData(e.target);
const actualdata={
    //isme jo email likha ye form me name me jo likha wo ha
    email:data.get('email'),
}
if(actualdata.email)
{
const res=await sendPasswordResetEmail(actualdata)
if(res.data.status ==="success"){
  //ye code iss liye q k jab ham submit krtay fill kr k tu jo enter kia fields me wo data usme he rehta
//hata k hona ye chahaye k jab submit pr click kre tu input fields b clear hojye tu ye code issi liye ha 
document.getElementById('password-reset-form').reset();
//ye wala code agr sari fill kr k submit kia tu neechy success login de ga
setError({ status:true, msg:"Recovery Password sent to your Email", type:'success'})
}
if(res.data.status ==="failed"){
//ye wala code agr sari fill kr k submit kia tu neechy success login de ga
setError({ status:true, msg:res.data.message, type:'error'})
}
}
else{

   setError({ status:true, msg:"Please Provide Email", type:'error'})
}
}

  return (
    <>
     <Grid container justifyContent={'center'}>
         <Grid item sm={6} xs={12}>
         <Box component="form" sx={{mt:1}} noValidate onSubmit={handlesubmit} id='password-reset-form'>
        
        <TextField required fullWidth margin='normal' id="email" label="Email Address" name="email"/>
         <Box textAlign='center'>
             <Button type='submit' variant='contained' sx={{mt:3,mt:2,px:5}}>Send</Button>
         </Box>
        
         {/* isko is liye error.status me likha q k jese page refresh krty error deta k status false ha
         dosre ilfaz me ye code tab chle jab ham action pora krle like submit krdia ya input chor k submit kia form
         ko tu agr status na likhtay oper tu ye khud chal rha tha hata k hamne na he submit kia na he kuch
         */}
         {/* yaha ham error show krwaye gay ya success submit hone k bd */}
         {error.status ?<Alert severity={error.type}>{error.msg}</Alert>:''}
        
            </Box>
         </Grid>
     </Grid>
    </>
  )
}

export default Sendpassresetemail