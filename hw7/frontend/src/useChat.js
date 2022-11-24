import { useState ,useContext,createContext, useEffect} from "react";
import { Button, Input, Tag ,message} from 'antd'
const LOCALSTORAGE_KEY='save_me'
const saveMe=localStorage.getItem(LOCALSTORAGE_KEY)
const ChatContext = createContext({
   status: {},
   Me: "",
   Password:'',
   setPassword:()=>{},
   SignIn: false,
   messages: [],
   sendMessage: () => {},
   displayStatus:()=>{},
   startChat:()=>{},
   setMessages:()=>{},
   setMe:()=>{},
   sendLogin:()=>{},
   sendReg:()=>{}
  });
const client = new WebSocket
('ws://localhost:4000')
const ChatProvider = (props) => {
   const [Me,setMe]=useState(saveMe || '')
   // console.log('check')
   const [messages, setMessages] = useState([]);
   const [SignIn,setSignIn]=useState(false);
   const [status, setStatus] = useState({});
   const [password,setPassword]=useState('')
   // const client = new WebSocket
   // ('ws://localhost:4000')
   client.onmessage = (byteString) => {
      const { data } = byteString;
      const [task, payload] = JSON.parse(data); 
      switch (task) {
         case "output": {
            console.log(messages)
            console.log('paylaod',payload)
            let m=[]
            for(let i=0;i<payload.length;i++){
               m.push({name:payload[i].users,body:payload[i].msg,sender:payload[i].me})

            }
            // let m={_id:payload._id,name:payload.name,body:payload.msg,sender:payload.sender}

            setMessages(() => 
            [...messages, ...m]); break; }
         case 'status':{
            setStatus(payload);
            break
         }
         case 'open':{
            // console.log('open')
            setMessages(()=>[...payload]);
            break
         }
         case 'login_res':{
            if(payload==='success'){
               setSignIn(true)
            }
            else{
               setSignIn(false)
            }
         }
         default: break;
         };
      }
   const makeName = (name, to) => { return [name, to].sort().join('_'); };
   const sendData = async (data) => {
      client.send(JSON.stringify(data));
   };
   const sendMessage = (msg,me,to) => { 
      let data={msg:msg,me:me,users:makeName(me,to)}
      sendData(['input',data])
   }
   const sendLogin =(user,password)=>{
      sendData(['login',{user,password}])
   }
   const sendReg =(user,password)=>{
      sendData(['reg',{user,password}])
   }
   const startChat = (me,to)=>{
      // const makeName = (name, to) => { return [name, to].sort().join('_'); };
      let users=makeName(me,to)
      sendData(['chat',users])
   }
   
   const displayStatus = (s) => {
      if (s.msg) {
      const { type, msg } = s;
      const content = {
      content: msg, duration: 0.5 }
      switch (type) {
      case 'success':
         message.success(content)
         break
      case 'error':
         message.error(content)
         break
      default:
         message.error(content)
         break
      }}}
   useEffect(()=>{
      if(SignIn){
         localStorage.setItem(LOCALSTORAGE_KEY,Me)
      }
   },[SignIn])
   useEffect(()=>{
      displayStatus(status)
   },[status])
   return (
      <ChatContext.Provider
      value={{
      status, Me, SignIn, messages, setMe, setSignIn,
      sendMessage, displayStatus,startChat,setMessages,password,setPassword,sendLogin,sendReg
      }}
      {...props}
      />
      );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };