import express from 'express'; 
import cors from 'cors'
import http from 'http'
import WebSocket from 'ws'
import mongo from './mongo'
import mongoose from 'mongoose'
import wsConnect from './wsConnect'
mongo.connect()
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection
db.once('open', () => {
  console.log("MongoDB connected!");
  wss.on('connection', (ws) => {
    ws.box = '';
    ws.onmessage=wsConnect.onMessage(ws)
  
  });
}); 
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { console.log('server on')});