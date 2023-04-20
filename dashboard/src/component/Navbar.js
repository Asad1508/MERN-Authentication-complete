import {AppBar,Box,Toolbar,Typography,Button} from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { GetToken } from '../services/jwtlocalstorage'
const Navbar = () => {
  //ye dkehne k liye k agr token tu login ha 
  const token=GetToken('token')
  return (
    <>
     <Box sx={{flexGrow: 1}}>
         <AppBar position="static" color="secondary">
             <Toolbar>
                 <Typography variant='h5' component='div'  sx={{flexGrow: 1}}>
                    Geek-shop
                 </Typography>
<Button component={NavLink} to='/' style={({isActive})=>{return {backgroundColor:isActive ? '#6d1b7b':''}}} sx={{color:"white"}}>Home</Button>
<Button component={NavLink} to='contact' style={({isActive})=>{return {backgroundColor:isActive ? '#6d1b7b':''}}} sx={{color:"white"}} >Contact</Button>
{/* ye code likha takay jab tk login ha tu login k button ki jaga dashboard ka button dikhaye ye token se horha 
jab logout krde tu dashboard k button ki jhaga login dikhaye
*/}
{token ? <Button component={NavLink} to='dashboard' style={({isActive})=>{return {backgroundColor:isActive ? '#6d1b7b':''}}} sx={{color:"white"}} >Dashboard</Button>
:<Button component={NavLink} to='login' style={({isActive})=>{return {backgroundColor:isActive ? '#6d1b7b':''}}} sx={{color:"white"}} >Login/Registration</Button>
  }
   
                 {/* <NavLink to='/' sx={{color:"white"}}>Home</NavLink>
                 <NavLink to='contact' sx={{color:"white"}}>Contact</NavLink> */}
             </Toolbar>
         </AppBar>
     </Box>
    </>
  )
}

export default Navbar