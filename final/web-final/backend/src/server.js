// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ server.js ]
// * PackageName  [ server ]
// * Synopsis     [ Connect to Database and Infrastructure of Backend ]
// * Author       [ Ya Chin Hu ]
// * Modified     [ Joey ] [Try to add wss connection method]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'
import init from './routes/testInit'
// import { dataInit } from './upload'
import mongo from './mongoDB.js'
import http from 'http'
import { WebSocketServer } from 'ws'
import wsConnect from './wsConnect.js'
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path';
// import { IpFilter } from "express-ipfilter"; // add IpFilter to prevent malicious ip connection

mongo.connect()
const app = express()
const server = http.createServer(app)

const wss = new WebSocketServer({ server })
const db = mongoose.connection

// init middleware
if(process.env.NODE_ENV === "developement"){
    app.use(cors())
}
app.use(cors())
app.use(express.json())
if(process.env.NODE_ENV === "developement"){
    app.use(function (req, res, next) {
        // res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.header('Access-Control-Allow-Origin', "*")
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        // res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept, X-Mashape-Authorization, IMGURPLATFORM, IMGURUIDJAFO, SESSIONCOUNT, IMGURMWBETA, IMGURMWBETAOPTIN')
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        next()
    })
}
// else if(process.env.NODE_ENV === "production"){
//     app.use(function (req, res, next) {
//         // res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//         res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
//         res.header('Access-Control-Allow-Credentials', 'true')
//         next()
//     })
// }

routes(app)

if(process.env.NODE_ENV === "production"){
    const __dirname = path.resolve();
    // app.use(IpFilter(["140.112.0.0/16"], {
    //     mode: "allow",
    //     detectIp: req => req.connection.remoteAddress?.replace("::ffff:", "") ?? ""
    // }));
    app.use(express.static(path.join(__dirname, "../frontend", "build")))
    app.get("/*", function(req, res){
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })
}

db.once('open', () => {
    console.log("MongoDB connected!");
    if (process.env.MODE === 'Reset') {
        console.log('Reset Mode: reset the data')
        init()

    }
    wss.on('connection', (ws) => {
        // Define WebSocket connection logic
        console.log("client connected!");
        ws.id = uuidv4() // generate unique key
        ws.box = '' // keep track of client's CURRENT chat box
        // wsConnect.initData(ws)
        ws.onmessage = wsConnect.onMessage(wss, ws)
    });
});


const axios_port = process.env.AXIOS_PORT || 4000
app.listen(axios_port, () => {
    console.log(`Server for axios is up on port ${axios_port}.`)
})

const wss_port = process.env.WSS_PORT || 4001
server.listen(wss_port, () => {
    console.log(`Server for wss is up on port ${wss_port}.`)
})
