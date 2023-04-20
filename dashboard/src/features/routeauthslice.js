//isme code kia takay user agar login ha tu dashboard me reh kr b url me login type kr k 
// dashboard me he rhe
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:null
}

export const routeauthSlice=createSlice({
    name:'auth_token',
    initialState,
    reducers:{
        //setuserinfo jaha call kre gay waha se ham pass kre gay email aur name
        //aur uske bd set krde gay neechy waly step me name aur email
        setUsertoken:(state,action)=>{
            state.token=action.payload.token
            
        },
        //isme empty data pass kr k unset kr skty
        unsetUsertoken:(state,action)=>{
            state.token=action.payload.token
            
        },
    }
})
export const {setUsertoken,unsetUsertoken}=routeauthSlice.actions
export default routeauthSlice.reducer

//sab krne k bd iss slice ko store.js me mention kro
//redux ko configure krne k liye slice bnatay aur bd me store me daltay