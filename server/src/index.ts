import dotenv from "dotenv"

dotenv.config({path:'.env'})
import authRouter from "./routes/auth.routes"
import workoutRouter from "./routes/workout.routes"
import exerciseRouter from "./routes/exercise.routes"
import aiRouter from "./routes/ai.routes"


import mongoose from "mongoose";
import { DB_NAME } from "./constant"

import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
const app=express();
app.use(express.json())
app.use(cookieParser())

app.use(cors({ origin: process.env.CLIENT_URL,credentials:true }))
app.use('/api/auth', authRouter)
app.use('/api/workout', workoutRouter)
app.use('/api/exercise', exerciseRouter)
app.use('/api/ai', aiRouter)
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Global error:", err.message)
  res.status(err.statusCode || 500).json({ message: err.message })
})


const connectdb= async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n MONGODB CONNECTED!! DB HOST: ${connectionInstance.connection.host}`);

        
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1);
        
    }
   
}


connectdb().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`App listening on port:${process.env.PORT}`)
    })
}).catch((err)=>
    console.log("Mongo db connection error",err)
)


