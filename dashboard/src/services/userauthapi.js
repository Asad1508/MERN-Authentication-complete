import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const UserauthApi = createApi({
  reducerPath: 'UserauthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user/' }),
  endpoints: (builder) => ({
    
    registerUser: builder.mutation({
        query:(user)=>{
          return {
              url:'registration',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
          }
      }
    }),
    loginUser:builder.mutation({
       query:(user)=>{
        return {
            url:'login',
            method:'POST',
            body:user,
            headers:{
                'Content-type':'application/json',
            }
        }
    } 
    }),
    sendPasswordResetEmail:builder.mutation({
      query:(user)=>{
       return {
           url:'senduserpasswordresetemails',
           method:'POST',
           body:user,
           headers:{
               'Content-type':'application/json',
           }
       }
   } 
   }),
 
   resetPassword:builder.mutation({
    query:({actualdata,id,token})=>{
     return {
      
         url:`/reset-password/${id}/${token}`,
         method:'POST',
         body:actualdata,
         headers:{
             'Content-type':'application/json',
         }
     }
 } 
 }),
 getLoggedUser:builder.query({
  query:(token)=>{
   return {
 
       url:`/loggeduser`,
       method:'GET',
       headers:{
           'authorization':`Bearer ${token}`,
       }
   }
} 
}),
changeUserPassword:builder.mutation({
  query:({actualdata,token})=>{
   return {

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


export const { useRegisterUserMutation,useLoginUserMutation,

  useSendPasswordResetEmailMutation,useResetPasswordMutation,useGetLoggedUserQuery,
  useChangeUserPasswordMutation } = UserauthApi
