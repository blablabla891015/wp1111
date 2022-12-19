import {checkOutChatBox,makeName} from "./functions"
const Mutation = {
    createChatbox: async(parent, { name1, name2 } ) => {
        let name = makeName(name1,name2)
        return await checkOutChatBox({name});
    },
    createMessage: async (parent, { name, to, body }, { pubsub } )=> {
        const chatBoxName = makeName(name, to);
        const chatBox = await checkOutChatBox({name:chatBoxName});
        const newMsg = { sender: name, body };
        chatBox.messages.push(newMsg);
        await chatBox.save();
        pubsub.publish(`Chatbox ${chatBoxName}`, {message: newMsg,});
        return newMsg;
    }
   };
export default Mutation