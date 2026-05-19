const mongoose = require('mongoose')
const {MONGO_URI} = require("../config/config")

const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Connected to DB")
    }catch(err){
        console.log("Database connection error")
    }
}

module.exports = connectDB