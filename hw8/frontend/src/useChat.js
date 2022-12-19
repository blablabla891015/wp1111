import { useState ,useContext,createContext, useEffect} from "react";
import { Button, Input, Tag ,message} from 'antd'
import { useMutation ,useQuery} from "@apollo/client";
import { CREATE_CHATBOX_MUTATION,MESSAGE_MUTATION } from "./graphql/mutations";
import { CHATBOX_QUERY } from "./graphql/query";
import { MESSAGE_SUBSCRIPTION } from "./graphql/subscribtion";
// import Chatbox from "../../backend/src/resolvers/Chatbox";
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
   sendReg:()=>{},
   friend:'',
   setFriend:()=>{}
  });
// const client = new WebSocket
// ('ws://localhost:4000')
const ChatProvider = (props) => {
   const [Me,setMe]=useState(saveMe || '')
   const [friend,setFriend]=useState('')
   // console.log('check')
   const [messages, setMessages] = useState([]);
   const [SignIn,setSignIn]=useState(false);
   const [status, setStatus] = useState({});
   const [password,setPassword]=useState('')
   // const client = new WebSocket
   // ('ws://localhost:4000')
   const makeName = (name, to) => { return [name, to].sort().join('_'); };
   const sendData = async (data) => {
      // client.send(JSON.stringify(data));
   };
   const [sendMessage] = useMutation(MESSAGE_MUTATION);
   const sendLogin =(user,password)=>{
      sendData(['login',{user,password}])
   }
   const sendReg =(user,password)=>{
      sendData(['reg',{user,password}])
   }

   const [getChatbox] = useMutation(CREATE_CHATBOX_MUTATION);
   
   const {data,loading,subscribeToMore}=useQuery(CHATBOX_QUERY,{variables:{name1:Me,name2:friend}})
   console.log(data)
   // useEffect(()=>{console.log(friend)},[friend])

   const startChat=async(name1,name2)=>{
      const {data}=await getChatbox({variables:{name1,name2}})
      setMessages(data.createChatbox.messages)
      

   }
   useEffect(() => {
      console.log('check')
      try {
      subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { from: Me, to: friend },
      updateQuery: (prev, { subscriptionData }) => {
         console.log("prev is",prev)
         

      if (!subscriptionData.data) return prev;
      const newMessage = subscriptionData.data.message;
      setMessages(prev.Chatbox.messages)
      return {
      Chatbox: {
         // name:makeName(Me,friend),
         messages: [...prev.Chatbox.messages, newMessage],
      },
      };
      },
      });
      } catch (e) {
         console.log(e)
      }
     }, [data]);
     
   
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
      sendMessage, displayStatus,startChat,setMessages,password,setPassword,sendLogin,sendReg,friend,setFriend
      }}
      {...props}
      />
      );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };