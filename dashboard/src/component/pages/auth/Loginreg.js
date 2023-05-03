import {Grid,Card,Typography,Tabs,Tab,Box} from '@mui/material';
import React, { useState } from 'react'
import pic1 from '../../../images/shop.png';
import Registration from './Registration';
import Userlogin from './userlogin';

const Tabpanel=(props)=>{
    const {children,value,index}=props;
    return(
        <div role="tabpanel" hidden={value!==index}>
            {
                value===index&&(
                    <Box>{children}</Box>
                )
            }
        </div>
    )
}
const Loginreg = () => {
   

const [value,setValue]=useState(0);
//isme jo event likha iss se tabs ka data disp horha    
const handlechange=(event,newValue)=>{
setValue(newValue);
}
  return (
    <>
    <Grid container sx={{height:'90vh'}}>
    <Grid item lg={7} sm={5} sx={{backgroundImage:`url(${pic1})`,backgroundRepeat:'no-repeat',
     backgroundSize:'cover', backgroundPosition:'center', display:{xs:'none',sm:'block'}
}} >
    </Grid>
    <Grid item lg={5} sm={7} xs={12}>
    <Card sx={{width:'100%', height:'100%'}}>
  
    <Box sx={{ width: '100%', borderBottom:1,borderColor:'divider'}}>
{/* ye login aur registration k neechy line jo arhi wo ha */}
      <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handlechange}>
        <Tab  label="Login" />
        <Tab  label="Registration" />
      </Tabs>
    </Box>
    <Tabpanel value={value} index={0}><Userlogin/></Tabpanel>
    <Tabpanel value={value} index={1}><Registration/></Tabpanel>
    </Card>
    </Grid>
    </Grid>
    </>
  )
}

export default Loginreg
