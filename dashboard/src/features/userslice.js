import { createSlice } from "@reduxjs/toolkit";

const initialState={
    email:"",
    name:"",
}

export const userSlice=createSlice({
    name:'user_info',
    initialState,
    reducers:{
        //setuserinfo jaha call kre gay waha se ham pass kre gay email aur name
        //aur uske bd set krde gay neechy waly step me name aur email
        setUserInfo:(state,action)=>{
            state.email=action.payload.email
            state.name=action.payload.name
        },
        //isme empty data pass kr k unset kr skty
        unsetUserInfo:(state,action)=>{
            state.email=action.payload.email
            state.name=action.payload.name
        },
    }
})
export const {setUserInfo,unsetUserInfo}=userSlice.actions
export default userSlice.reducer

//sab krne k bd iss slice ko store.js me mention kro
//redux ko configure krne k liye slice bnatay aur bd me store me daltay