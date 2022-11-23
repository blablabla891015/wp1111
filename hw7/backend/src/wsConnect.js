import Message from './models/message'
import ChatBoxModel from './models/checkbox';

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data)); }

const sendStatus = (payload, ws) => {
sendData(["status", payload], ws); }

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box){box = await new ChatBoxModel({ name, users: participants }).save();}
    
    box.populate('messages')
    let msgs=(await box.populate('messages')).$getPopulatedDocs()
    return msgs
   };
export default {
    onMessage: (ws) => (
        async (byteString) => {
        const { data } = byteString
        const [task, payload] = JSON.parse(data)
        switch (task) {
            case 'input': {
                
                const name=payload.users
                const body=payload.msg
                const sender=payload.me


                ChatBoxModel.find({'name':name},async(err,chatboxes)=>{
                    if(err || chatboxes.length!==1){
                        throw new Error("Update chatbox DB  error: " )
                    }
                    else{
                        let id=chatboxes[0]._id 
                        let messages=chatboxes[0].messages
                        const message= new Message({ name, body,sender,chatBox:id })
                        // console.log(message.populate('chatBox'))
                        try{
                            await ChatBoxModel.findOneAndUpdate({name:name} ,{ messages:[...messages,message._id] })
                        }catch(e){
                            throw new Error("Update chatbox DB  error: " + e)
                        }
                        // await ChatBoxModel.findOneAndUpdate({name:name} ,{ messages:[...messages,id] })
        
                        try { await message.save();
                        } catch (e) { throw new Error
                        ("Message DB save error: " + e); }
                        sendData(['output', [payload]], ws)
                        sendStatus({
                        type: 'success',
                        msg: 'Message sent.'
                        }, ws)
                    }
                })
                
                break
            }
            case 'chat':{
                let users=payload.split('_')
                let msgs=await validateChatBox(payload,users)
                sendData(['open',msgs],ws)

                sendStatus({
                    type: 'success',
                    msg: 'Chatbox opened.'
                    }, ws)
                break
            }
            // case '':{
            //     console.log('check m')
            //     break
            // }
            default:{
                break
            }

        }
    }
    )
}