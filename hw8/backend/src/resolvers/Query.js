// import ChatBoxModel from "../models/checkbox"
import {checkOutChatBox,makeName} from "./functions";
const Query ={
    Chatbox:async (parent,{name1,name2},{ChatBoxModel})=>{
    const name=makeName(name1,name2)
    console.log(name)
    return checkOutChatBox({name})
    }
}
export default Query