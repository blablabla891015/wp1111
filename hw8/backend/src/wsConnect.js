import Message from './models/message'
import ChatBoxModel from './models/checkbox';
import User from './models/user';
const sendData = (data, ws) => {
    ws.send(JSON.stringify(data)); }

const sendStatus = (payload, ws) => {
sendData(["status", payload], ws); }

const broadcastMessage = (wss, data, status,name) => {
    wss.clients.forEach((client) => {
        // console.log(client.box)
        if (client.box===name){
            sendData(data, client);
            sendStatus(status, client);

        }
        // sendData(data, client);
        // sendStatus(status, client);
    });
   };
const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box){box = await new ChatBoxModel({ name, users: participants }).save();}
    
    box.populate('messages')
    let msgs=(await box.populate('messages')).$getPopulatedDocs()
    return msgs
   };
export default {
    onMessage: (ws,wss) => (
        async (byteString) => {
        const { data } = byteString
        const [task, payload] = JSON.parse(data)
        switch (task) {
            case 'input': {
                
                const name=payload.users
                const body=payload.msg
                const sender=payload.me
                ws.box=name

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
                        broadcastMessage(wss,['output', [payload]],{type: 'success',msg: 'Message sent.'},name)
                        // sendData(['output', [payload]], ws)
                        // sendStatus({
                        // type: 'success',
                        // msg: 'Message sent.'}, ws)
                    }
                })
                
                break
            }
            case 'chat':{
                let users=payload.split('_')
                let msgs=await validateChatBox(payload,users)
                ws.box=payload
                broadcastMessage(wss,['open',msgs],{type: 'success',msg: 'Chatbox opened.'},payload)
                // sendData(['open',msgs],ws)

                // sendStatus({type: 'success',msg: 'Chatbox opened.'}, ws)
                break
            }
            case 'login':{
                const user=payload.user
                const password=payload.password
                let exist=await User.findOne({user:user,password:password})
                ///////////////////////
                // exist=true
                //////////////////
                if(exist){
                    sendData(['login_res','success'],ws)
                    sendStatus({type: 'success',msg: 'Login.'},ws)
                }
                else{
                    sendData(['login_res','fail'],ws)
                    sendStatus({type: 'error',msg: 'wrong username or password.'},ws)

                }
                
                break
            }
            case 'reg':{
                const user=payload.user
                const password=payload.password
                let exist=await User.findOne({user:user})
                if(exist){
                    sendStatus({type: 'error',msg: 'user already exist.'},ws)
                    break
                }
                const New_user=new User({user:user,password:password})
                try { await New_user.save();
                } catch (e) { throw new Error
                ("Message DB save error: " + e); }
                sendStatus({type: 'success',msg: 'reg sucessfully.'},ws)
                break
            }
            default:{
                break
            }

        }
    }
    )
}