//token ko store krne k liye ye file bnai

const StoreToken=(value)=>{
    //isme token key ha aur value actual token ha jo parameter se aye ga
localStorage.setItem('token',value)
}

const GetToken=()=>{
    let token=localStorage.getItem('token')
    return token
}
const RemoveToken=(value)=>{
    localStorage.removeItem(value)
}

export {StoreToken,GetToken,RemoveToken}