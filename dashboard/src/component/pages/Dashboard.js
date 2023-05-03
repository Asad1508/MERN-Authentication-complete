import {Grid, Button, Typography, CssBaseline} from '@mui/material'
import {React, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { GetToken, RemoveToken } from '../../services/jwtlocalstorage';
import Changepass from './auth/Changepass';
import { useGetLoggedUserQuery } from '../../services/userauthapi';
import { useDispatch } from 'react-redux';
import { setUserInfo, unsetUserInfo } from '../../features/userslice';
import { unsetUsertoken } from '../../features/routeauthslice';
const Dashboard = () => {
const navigate=useNavigate();
 const handlelog=()=>{
     dispatch(unsetUsertoken({token:null}))
     dispatch(unsetUserInfo({name:"",email:""}))
  
     RemoveToken('token')
     navigate('/login')
 }   
 const token=GetToken()
 const {data, isSuccess}=useGetLoggedUserQuery(token)
 console.log(data)
 const [userData,setUserdata]=useState({
   email:"",
   name:""
 })
 useEffect(()=>{
  if(data && isSuccess)
  {
    setUserdata({
      email:data.user.email,
      name:data.user.name
    })
  }

 },[data,isSuccess])

const dispatch= useDispatch()
useEffect(()=>{
  if(data && isSuccess)
  {
    dispatch(setUserInfo({
    email:data.user.email,
    name:data.user.name
    }))
  }

 },[data,isSuccess,dispatch])

  return (
    <>
    <Grid container>
        <Grid item sm={4} sx={{backgroundColor:'gray', p:5, color:'white'}}>
        {/* isme jo userdata wo state me likha  */}
        <Typography variant='h5' >Email: {userData.email}</Typography>
        <Typography variant='h6'>Name: {userData.name}</Typography>
        <Button variant='contained' color='warning' size='large' sx={{mt:8}} onClick={handlelog}>LogOut</Button>
        </Grid>
        
        <Grid item sm={8}>
         <Changepass/>
        </Grid>
    </Grid>
    </>
  )
}

export default Dashboard
