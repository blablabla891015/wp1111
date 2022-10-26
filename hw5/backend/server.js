import express from "express";
import cors from "cors";
import guessRoute from './routes/guess'

const app=express()
app.use(cors())
app.use('/api/guess',guessRoute)
// app.use('/api/start',guessRoute)
const port = process.env.Port || 4000
app.listen(port,()=>{
    console.log("Server is up on port ${port}")
})