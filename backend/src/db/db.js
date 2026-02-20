const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully ✅")
    }catch(err){
        console.error("db connection error : ", err)
        throw err
    }
}

module.exports = connectDB;