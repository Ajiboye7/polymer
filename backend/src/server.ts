import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import UserRoute from "./routes/UserRoute"


const app = express()

app.use('/user', UserRoute);

mongoose.connect(process.env.MONGO_URI!)

.then(()=>{
    app.listen(process.env.PORT, ()=> {
        console.log("connected to Database & listening on port", process.env.PORT);
    })
})

.catch((error)=> {
    console.error('Error connecting to MongoDB', error)
})