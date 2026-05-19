const dotenv = require('dotenv')
dotenv.config()
const app = require('./src/app')
const connectDB = require("./src/db/db")


const PORT = 3000
connectDB()



app.listen(PORT, ()=>{
    console.log(`App is running on the port:${PORT}`)
    console.log(`http://localhost:${PORT}`)
})