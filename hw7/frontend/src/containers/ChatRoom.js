
import { useState ,useEffect } from 'react'
import { Button, Input, Tag ,message,Tabs} from 'antd'
import {useChat} from '../useChat'
import styled from 'styled-components'
import ChatModal from '../compenents/ChatModal'
const ChatBoxesWrapper=styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
  `

const ChatRoom=()=>{
    const { status, messages,sendMessage ,displayStatus,Me} = useChat()
    const [chatBoxes,setChatBoxes]=useState([])
    const [activeKey, setActiveKey]=useState('')
    const [username, setUsername] = useState('')
    const [body, setBody] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
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
    const renderChat = (chat) => (console.log("abc")); //backend  ......
    const extractChat = (friend) => {
    return renderChat
    (messages.filter
    (({name, body}) => ((name === friend) || (name === Me))));
    }
    const createChatBox = (friend) => {
        if (chatBoxes.some
         (({key}) => key === friend)) {
         throw new Error(friend +
         "'s chat box has already opened.");
         }
         const chat = extractChat(friend);
         setChatBoxes([...chatBoxes,
         { label: friend, children: chat,
         key: friend }]);
        //  setMsgSent(true);
         return friend;
        };
    const onEdit=(targetKey, action) => {
        if (action === 'add') setModalOpen(true);
        else if (action === 'remove') {
        setActiveKey(removeChatBox(targetKey, activeKey));
        }
    }
    useEffect(() => {
    displayStatus(status)}, [status])
    return(
      <>
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger >
          Clear
        </Button>
      </div>
      <ChatBoxesWrapper items={chatBoxes} onEdit={onEdit} type="editable-card">
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
            extractChat(name);
            setModalOpen(false);
            }}
            onCancel={() => { setModalOpen(false);}}>

      </ChatModal>
      <Input
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
      value={body}
      onChange={(e) => setBody(e.target.value)}
      enterButton="Send"
      placeholder="Type a message here..."
      onSearch={(msg) => {
        if (!msg || !username) {
          displayStatus({
          type: 'error',
          msg: 'Please enter a username and a message body.'
          })
          return
          }
        sendMessage({ name: username, body: msg })
        setBody('')
      }}
      ></Input.Search>
    </>
    )
  }
export default ChatRoom;