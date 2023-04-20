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
     //ye code token ko unset krne k liye jo k bnaya ha route k secure krne k liye
     dispatch(unsetUsertoken({token:null}))
  //ye hamne iss liye kia takay agr ham redux k through kisi dosre component me user ka data disp krwa rhe
     //tu logout hone k bd data b ghaib hojana chahye tu ye code ghaib he kr rha
     dispatch(unsetUserInfo({name:"",email:""}))
  
     RemoveToken('token')
     navigate('/login')
 }   
 //hme token b pass krna loggeduser k liye tu hamne 1 function bnaya jwtlocalstorage.js me
 //gettoken() ka waha se token get kr rhe 
 const token=GetToken()
 const {data, isSuccess}=useGetLoggedUserQuery(token)
 console.log(data)
//ye hamne kia state create ki takay user ka data disp krwa sky jo login ha
 const [userData,setUserdata]=useState({
   email:"",
   name:""
 })
 //store user data in local state
 useEffect(()=>{
  if(data && isSuccess)
  {
    setUserdata({
      email:data.user.email,
      name:data.user.name
    })
  }
  //isme data aur is success dia q k error de rha tha 
  //ye hamne dependency array dia agr ni de gay tu unlimited time execute hoga 
  //tu ismme hamne btaya k kab execute ho 
 },[data,isSuccess])

 //store user data in redux store
const dispatch= useDispatch()
useEffect(()=>{
  if(data && isSuccess)
  {
    //isme setuserinfo function jo slice me ha usko call kr rhe
    dispatch(setUserInfo({
    email:data.user.email,
    name:data.user.name
    }))
  }
  //isme data aur isssuccess dia q k error de rha tha 
  //ye hamne dependency array dia agr ni de gay tu unlimited time execute hoga 
  //tu ismme hamne btaya k kab execute ho 
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