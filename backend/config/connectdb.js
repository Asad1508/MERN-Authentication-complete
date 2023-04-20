import mongoose from "mongoose";
const Connectdbs=async()=>{
await mongoose.connect("mongodb://localhost:27017/jwttoken");
console.log("connected successfuly");
}

export default Connectdbs;