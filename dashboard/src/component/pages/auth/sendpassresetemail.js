import {Grid, TextField, Button, Box, Alert} from '@mui/material';
import {React, useState }from 'react'
import { useSendPasswordResetEmailMutation } from '../../../services/userauthapi';
const Sendpassresetemail = () => {

    const [error,setError]=useState({
        status:false,
        msg:"",
        type:""
}) 
const [sendPasswordResetEmail,{isLoading}]=useSendPasswordResetEmailMutation()
const handlesubmit= async (e)=>{    
e.preventDefault();

const data=new FormData(e.target);
const actualdata={
    //isme jo email likha ye form me name me jo likha wo ha
    email:data.get('email'),
}
if(actualdata.email)
{
const res=await sendPasswordResetEmail(actualdata)
if(res.data.status ==="success"){

document.getElementById('password-reset-form').reset();
setError({ status:true, msg:"Recovery Password sent to your Email", type:'success'})
}
if(res.data.status ==="failed"){
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
   
         {error.status ?<Alert severity={error.type}>{error.msg}</Alert>:''}
        
            </Box>
         </Grid>
     </Grid>
    </>
  )
}

export default Sendpassresetemail
