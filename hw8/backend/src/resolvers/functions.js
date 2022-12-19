import ChatBoxModel from "../models/chatbox";
const checkOutChatBox=async ({name})=>{
    // console.log(name)
    let box = await ChatBoxModel.findOne({ name });
    if (!box){box = await new ChatBoxModel({ name }).save();}
// console.log(box)
return box}
const makeName = (name, to) => { return [name, to].sort().join('_'); };
export {checkOutChatBox,makeName}