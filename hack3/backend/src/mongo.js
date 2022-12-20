import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";
import dotenv from 'dotenv-defaults'
mongoose.set("strictQuery", true);

async function connect() {
  // TODO 1 Connect to your MongoDB and call dataInit()
  dotenv.config()
  mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        }
    
    // TODO Part I-3: connect the backend to mongoDB
).then(async res => {
    if (process.env.MODE === 'Reset') {
        console.log('Reset Mode: reset the data')
        dataInit()
    }
})
  // TODO 1 End
}

export default { connect };
