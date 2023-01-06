import axios from 'axios'

// if NODE_ENV is "production"   -> set URL to /api
// if NODE_ENV is "developement" -> set URL to http://${hostname}:4000/api
const hostname = window.location.hostname
const API_ROOT = (process.env.NODE_ENV === "production") 
                  ? "/api"
                  : "http://" + hostname + ":4000/api"
                  // : "http://localhost:4000/api" ;

const instance = axios.create({
  baseURL: API_ROOT,
});

// const instance = axios.create({
//     baseURL: 'http://localhost:4000/api'
// })
export default instance