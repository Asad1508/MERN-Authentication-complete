
const StoreToken=(value)=>{
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
