import { useState ,useContext,createContext, useEffect} from "react";
import { Button, Input, Tag ,message} from 'antd'
const LOCALSTORAGE_KEY='save_me'
const saveMe=localStorage.getItem(LOCALSTORAGE_KEY)
const ChatContext = createContext({
   status: {},
   Me: "",
   SignIn: false,
   messages: [],
   sendMessage: () => {},
   clearMessages: () => {},
  });
const ChatProvider = (props) => {
   const [Me,setMe]=useState(saveMe || '')
   const [messages, setMessages] = useState([]);
   const [SignIn,setSignIn]=useState(false);
   const [status, setStatus] = useState({});
   const client = new WebSocket
   ('ws://localhost:4000')
   client.onmessage = (byteString) => {
      const { data } = byteString;
      const [task, payload] = JSON.parse(data); 
      switch (task) {
         case "output": {
         setMessages(() => 
         [...messages, ...payload]); break; }
         case 'status':{
            setStatus(payload);break

         }
         default: break;
         };
      }
   const sendData = async (data) => {
      await client.send(JSON.stringify(data));
   };
   const sendMessage = (msg) => { 
      sendData(['input',msg])
      console.log(msg);
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
      default:
      message.error(content)
      break
      }}}
   useEffect(()=>{
      if(SignIn){
         localStorage.setItem(LOCALSTORAGE_KEY,Me)
      }
   },[SignIn])

   return (
      <ChatContext.Provider
      value={{
      status, Me, SignIn, messages, setMe, setSignIn,
      sendMessage, displayStatus
      }}
      {...props}
      />
      );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };