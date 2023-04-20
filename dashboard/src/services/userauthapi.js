import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const UserauthApi = createApi({
  reducerPath: 'UserauthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user/' }),
  endpoints: (builder) => ({
    //yaha registerUser ki jaga kuch b likh skty q k ye pehla step ha aur mutation likha q k
    //create/insert update ya dlt k liye likhtay agr read krna tu query likhtay
    //iske bd isko store me import kia takay isko use kr sky
    registerUser: builder.mutation({
      //isme jo user ha wo jo actualdata likha wo ha jo input kr rha user
        query:(user)=>{
          return {
              //isme jo url ha isme endpoint likhtay isme jo regsiteration likha ye route ha k 
              //registeration pr hit hokr ye controller me jye ga 
              url:'registration',
              method:'POST',
              //jo b user me aye ga wo body me ajye ga
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
          }
      }
    }),
    loginUser:builder.mutation({
       //isme jo user ha wo jo actualdata likha wo ha jo input kr rha user
       query:(user)=>{
        return {
            //isme jo url ha isme endpoint likhtay isme jo login likha ye route ha k 
            //login pr hit hokr ye controller me jye ga 
            url:'login',
            method:'POST',
            //jo b user me aye ga wo body me ajye ga
            body:user,
            headers:{
                'Content-type':'application/json',
            }
        }
    } 
    }),
    sendPasswordResetEmail:builder.mutation({
      //isme jo user ha wo jo actualdata likha wo ha jo input kr rha user
      query:(user)=>{
       return {
           //isme jo url ha isme endpoint likhtay isme jo login likha ye route ha k 
           //login pr hit hokr ye controller me jye ga 
           url:'senduserpasswordresetemails',
           method:'POST',
           //jo b user me aye ga wo body me ajye ga
           body:user,
           headers:{
               'Content-type':'application/json',
           }
       }
   } 
   }),
   //isko import kr rhe resepassword.js jo k front end ha usme aur waha se api me bhj rhe phir api se
   //expressauth me
   resetPassword:builder.mutation({
    //isme jo user ha wo jo actualdata likha wo ha jo input kr rha user
    query:({actualdata,id,token})=>{
     return {
         //isme jo url ha isme endpoint likhtay isme jo login likha ye route ha k 
         // ye wala url express js walay route.js me ha 
         url:`/reset-password/${id}/${token}`,
         method:'POST',
         //jo b user me aye ga wo body me ajye ga
         body:actualdata,
         headers:{
             'Content-type':'application/json',
         }
     }
 } 
 }),
 getLoggedUser:builder.query({
  //isme jo user ha wo jo actualdata likha wo ha jo input kr rha user
  query:(token)=>{
   return {
       //isme jo url ha isme endpoint likhtay isme jo login likha ye route ha k 
       // ye wala url express js walay route.js me ha 
       url:`/loggeduser`,
       method:'GET',
       headers:{
           'authorization':`Bearer ${token}`,
       }
   }
} 
}),
changeUserPassword:builder.mutation({
  //isme jo user ha wo jo actualdata likha wo ha jo input kr rha user
  query:({actualdata,token})=>{
   return {
       //isme jo url ha isme endpoint likhtay isme jo login likha ye route ha k 
       // ye wala url express js walay route.js me ha 
       url:'/changepass',
       method:'POST',
       body:actualdata,
       headers:{
           'authorization':`Bearer ${token}`,
       }
   }
} 
}),
  }),
})

//isme jo  useRegisterUserMutation likha isko export kr rhe takay isme data bhj ske 
//front end ka q k ye 1 api bnai yaha se hokr backend jye ga data
//ye hook generate kr rhe
export const { useRegisterUserMutation,useLoginUserMutation,
  //isme usegetloggeduserquery ko dashboard me import krna takay 
  //data jo login ha uska as a profile dikhaya ja ske
  useSendPasswordResetEmailMutation,useResetPasswordMutation,useGetLoggedUserQuery,
  useChangeUserPasswordMutation } = UserauthApi