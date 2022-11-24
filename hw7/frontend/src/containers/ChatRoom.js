
import { useState ,useEffect, useRef } from 'react'
import { Button, Input, Tag ,message,Tabs} from 'antd'
import {useChat} from '../useChat'
import styled from 'styled-components'
import ChatModal from '../compenents/ChatModal'
// import { set } from 'mongoose'
const ChatBoxesWrapper=styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
  `
const FootRef = styled.div`
height: 20px;
`
;
const StyledMessage = styled.div`
 display: flex;
 align-items: center;
 flex-direction: ${({isMe}) => (isMe ? 'row-reverse' : 'row')};
 margin: 8px 10px;
 & p:first-child {
 margin: 0 5px;
 }
 & p:last-child {
 padding: 2px 5px;
 border-radius: 5px;
 background: #eee;
 color: gray;
 margin: auto 0;
 }
`
;
const ChatRoom=()=>{
    const { status, messages,sendMessage ,displayStatus,Me,startChat,setMessages} = useChat()
    const [chatBoxes,setChatBoxes]=useState([])
    const [activeKey, setActiveKey]=useState('')
    const [msgSent,setMsgSent]=useState(false)
    // const [username, setUsername] = useState('')
    const [body, setBody] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const msgFooter=useRef(null)

    const footer=<FootRef ref={msgFooter} key='footer'></FootRef>
    const scrollToBottom = () => {
      msgFooter.current?.scrollIntoView
      ({ behavior: 'smooth', block: "start" });
      };
    const removeChatBox =
        (targetKey, activeKey) => {
        const index = chatBoxes.findIndex
        (({key}) => key === activeKey);
        const newChatBoxes = chatBoxes
        .filter(({key}) =>
        key !== targetKey);
        setChatBoxes(newChatBoxes);
        return activeKey?
        activeKey === targetKey?
        index === 0?
        '' : chatBoxes[index - 1].key
        : activeKey
        : '';
        };
    // const renderChat = (chat) => (console.log("abc")); //backend  ......
    // const extractChat = (friend) => {
    // return renderChat
    // (messages.filter
    // (({name, body}) => ((name === friend) || (name === Me))));
    // }

  
    const createChatBox = (friend) => {
        if (chatBoxes.some
        (({key}) => key === friend)) {
        throw new Error(friend +
        "'s chat box has already opened.");
        }
        //  const chat = startChat(Me,friend);
        // console.log(abc)
        setChatBoxes([...chatBoxes,
        { label: friend, children: <></>,
        key: friend }]);
        setMsgSent(true);
        return friend;
      };
    const onEdit=(targetKey, action) => {
        if (action === 'add') setModalOpen(true);
        else if (action === 'remove') {
        setActiveKey(removeChatBox(targetKey, activeKey));
        }
    }
    const chatboxonChange=(key) => {
      setActiveKey(key);
      startChat(Me,key);
      }
    useEffect(() => {
    displayStatus(status)}, [status])
    useEffect(()=>{
      // console.log(messages)
      let new_chatBoxes=chatBoxes
      for(let i =0;i<new_chatBoxes.length;i++){
        if(new_chatBoxes[i].key===activeKey){
          let res=messages.map(({ sender, body }, i) => {
            let isMe=false
            if(sender===Me){
              isMe=true
            }
            return(
            <StyledMessage isMe={isMe} key={i}> {body}</StyledMessage>)})
          new_chatBoxes[i].children=[...res,footer]
        }
      }
      setMsgSent(true)
      // console.log(chatBoxes)
      setChatBoxes(new_chatBoxes)
    },[messages]
    )
    useEffect(() => {
      scrollToBottom();
      setMsgSent(false);
      }, [msgSent]);
    // useEffect(()=>{
    //   setMessages(()=>[])
    // },[messages])
    // useEffect(() => {
    //   console.log(messages)}, [messages])
    return(
      <>
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger >
          Clear
        </Button>
      </div>
      <ChatBoxesWrapper items={chatBoxes} onEdit={onEdit} type="editable-card" onChange={chatboxonChange}>
      {messages.length === 0 ? (
      <p style={{ color: '#ccc' }}> No messages... </p>
      ) : (
      messages.map(({ name, body }, i) => (
      <p className="App-message" key={i}>
      <Tag color="blue">{name}</Tag> {body}
      </p>
      ))
      )}
      </ChatBoxesWrapper>
      <ChatModal open={modalOpen}
            onCreate={({ name }) => {
            setActiveKey(createChatBox(name));
            startChat(Me,name)
            setModalOpen(false);
            }}
            onCancel={() => { setModalOpen(false);}}>

      </ChatModal>
      {/* <Input
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      style={{ marginBottom: 10 }}
      ></Input> */}
      <Input.Search
      value={body}
      onChange={(e) => setBody(e.target.value)}
      enterButton="Send"
      placeholder="Type a message here..."
      onSearch={(msg) => {
        if (!msg) {
          displayStatus({
          type: 'error',
          msg: 'Please enter a username and a message body.'
          })
          return
          }
        console.log(activeKey)
        sendMessage(msg,Me,activeKey)
        setBody('')
      }}
      ></Input.Search>
    </>
    )
  }
export default ChatRoom;