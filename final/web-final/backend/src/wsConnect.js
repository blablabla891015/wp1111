import { MessageModel, ChatBoxModel } from "./models/chatbox.js"

const makeName = (name, to) => { return [name, to].sort().join('_'); };

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
        box = await new ChatBoxModel
            ({ name, users: participants }).save();
    return box.populate
        (["users", { path: 'messages', populate: 'sender' }]);
};

const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

export default {
    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'message': {
                    console.log(payload)
                    const { name, to, body } = payload
                    const chatBoxName = makeName(name, to)
                    // find chatbox id by name
                    const existing = await ChatBoxModel.findOne({ name: chatBoxName })
                    if (existing) {
                        // Save message to DB
                        const message = new MessageModel({ name: chatBoxName, chatBox: existing._id, sender: name, body: body })
                        // console.log(message)
                        try {
                            await message.save();
                        } catch (e) {
                            throw new Error("Message DB save error: " + e);
                        }
                        // update chatbox (append new message's id to chatbox's messages)
                        await ChatBoxModel.updateOne({ name: chatBoxName }, { $push: {messages: message._id} })
                    } else {
                        console.log("error: chatbox not found!")
                    }
                    
                    const newPayload = {name: name, body: body}
                    // Broadcast to client (only send {name, body} back to client)
                    console.log("payload", newPayload)
                    wss.clients.forEach((client) => {
                        console.log("client's name:", client.box)
                        if(client.box == chatBoxName){
                            sendData(['output', [newPayload]], client)
                            sendStatus({ type: 'success', msg: 'Message sent.' }, ws)
                        }
                    });
                    // sendData(['output', [newPayload]], ws)
                    // sendStatus({ type: 'success', msg: 'Message sent.' }, ws)
                }

                case 'chat': {
                    const { name, to } = payload
                    const chatBoxName = makeName(name, to)
                    console.log('chatBoxName', chatBoxName)
                    ws.box = chatBoxName

                    // check if chatbox exist
                    let existing = await ChatBoxModel.findOne({ name: chatBoxName })
                    
                    var existing_msg = undefined
                    if (existing) {
                        // console.log(existing)
                        // load messages according to chatBoxName
                        let populate_checkbox = await existing.populate({path: "messages"});
                        existing_msg = populate_checkbox.messages
                        // existing_sender = existing_msg.sender
                        // console.log('populate_checkbox: ', populate_checkbox)
                        // console.log('existing_msg: ', existing_msg)
                        // console.log('existing_sender: ', existing_sender)
                    }else{
                        // create a new chatbox
                        const chatbox = new ChatBoxModel({ name: chatBoxName, messages: undefined })
                        // Save chatbox to DB
                        try {
                            await chatbox.save();
                        } catch (e) {
                            throw new Error("chatbox DB save error: " + e);
                        }
                    }
                    

                    // Respond to client 
                    // sendData(['output', [payload]], ws)
                    if(existing_msg === undefined){
                        // chatbox is new, no need to sendData
                    }else{
                        let newPayload = existing_msg.map((element) => {
                            // console.log(element.body) // should be the single msg
                            return {name: element.sender, body: element.body}
                        })
                        console.log(newPayload)
                        sendData(["init", newPayload], ws);
                    }
                    sendStatus({ type: 'success', msg: 'Chatbox created/changed.' }, ws)
                }
                default: break
            }
        }
    )
}