
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
    const { setFriend, messages,sendMessage ,displayStatus,Me,startChat,setMessages} = useChat()
    const [chatBoxes,setChatBoxes]=useState([])
    const [activeKey, setActiveKey]=useState('')
    const [msgSent,setMsgSent]=useState(false)
    // const [username, setUsername] = useState('')
    const [body, setBody] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const msgFooter=useRef(null)

    const footer=()=><FootRef ref={msgFooter} key='footer'></FootRef>
    const scrollToBottom = () => {
      // console.log(msgFooter.current)
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

  
    const createChatBox = (friend) => {
        if (chatBoxes.some
        (({key}) => key === friend)) {
        throw new Error(friend +
        "'s chat box has already opened.");
        }
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
        // console.log(removeChatBox(targetKey, activeKey))
        setFriend(removeChatBox(targetKey, activeKey))
        }
    }
    const chatboxonChange=(key) => {
      // console.log('key is',key)
      setActiveKey(key);
      setFriend(key)
      startChat(Me,key);
      }
    // useEffect(() => {
    //   if(JSON.stringify(status) !== '{}'){
    //     console.log(status)
    //     displayStatus(status)}}, [status])
    useEffect(()=>{
      let new_chatBoxes=chatBoxes
      for(let i =0;i<new_chatBoxes.length;i++){
        if(new_chatBoxes[i].key===activeKey){
          // const footer=()=><FootRef ref={msgFooter} key='footer'></FootRef>
          let res=messages.map(({ sender, body }, i) => {
            let isMe=false
            if(sender===Me){
              isMe=true
            }
            return(
            <StyledMessage isMe={isMe} key={i}> {body}</StyledMessage>)})
          new_chatBoxes[i].children=[...res,footer()]
          // console.log(new_chatBoxes[i].children)
        }
        else{
          new_chatBoxes[i].children=[]

        }
      }
      // console.log('jghgj',msgSent)
      setMsgSent(true)
      setChatBoxes(new_chatBoxes)
    },[messages]
    )
    useEffect(() => {
      scrollToBottom();
      // console.log('ggdgdsgsg',msgSent)
      setMsgSent(false);
      // console.log('ggdgdsgsg',msgSent)

      }, [msgSent]);
    return(
      <>
      <div className="App-title">
        <h1>{Me}'s ChatRoom</h1>
      </div>
      <ChatBoxesWrapper items={chatBoxes} onEdit={onEdit} type="editable-card" onChange={chatboxonChange} activeKey={activeKey}>
      </ChatBoxesWrapper>
      <ChatModal open={modalOpen}
            onCreate={({ name }) => {
            setActiveKey(createChatBox(name));
            setFriend(createChatBox(name))
            startChat(Me,name)
            setModalOpen(false);
            }}
            onCancel={() => { setModalOpen(false);}}>

      </ChatModal>
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
        // console.log(msg)
        sendMessage({variables:{from:Me,to:activeKey,body:msg}})
        setBody('')
      }}
      ></Input.Search>
    </>
    )
  }
export default ChatRoom;