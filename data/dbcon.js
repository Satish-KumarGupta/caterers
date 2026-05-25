import mongoose from "mongoose";

// using mongodb connection
// mongoose
//   .connect("mongodb://localhost:27017/local")
//   .then(() => console.log("connected successfully"))
//   .catch((err) => console.log(err));


const con=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/local");
        console.log("conneted successfully");
    }catch(eror){
        console.log("connection failed");
        console.log(eror);
    }
}
export default con;