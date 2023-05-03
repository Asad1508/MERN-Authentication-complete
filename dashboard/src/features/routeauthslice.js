
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:null
}

export const routeauthSlice=createSlice({
    name:'auth_token',
    initialState,
    reducers:{
        setUsertoken:(state,action)=>{
            state.token=action.payload.token
            
        },
        unsetUsertoken:(state,action)=>{
            state.token=action.payload.token
            
        },
    }
})
export const {setUsertoken,unsetUsertoken}=routeauthSlice.actions
export default routeauthSlice.reducer

