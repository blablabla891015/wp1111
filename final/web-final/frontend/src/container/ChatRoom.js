// import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Tabs, Input, Tag } from 'antd'
import { useChat } from './hooks/useChat'
import { useUser } from './hooks/useUser';
import styled from "styled-components"
import Title from "../components/Title"
import { Fragment } from 'react'
import Message from "../components/Message"
import ChatModal from "../components/ChatModal"

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
`;

const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 20px;
`;

const ChatRoom = () => {
    const { messages, sendMessage, startChat, displayStatus } = useChat()
    const [usrname, setUsrname] = useState('')
    const [msg, setMsg] = useState('') // text input body
    const [msgSent, setMsgSent] = useState(false)

    const [chatBoxes, setChatBoxes] = useState([]); // for different tabs { label, children, key }
    const [activeKey, setActiveKey] = useState(''); // decide which tab is showing
    const [modalOpen, setModalOpen] = useState(false); // control modal appear or not

    // const msgRef = useRef(null)
    const msgFooter = useRef(null)

    const { user_name } = useUser() // equivalent to the "me" in useChat()

    const LOCALSTORAGE_USERNAME='saved_username'
    var savedUsername = localStorage.getItem(LOCALSTORAGE_USERNAME)

    // const displayMessages = () => (
    //     messages.length === 0 ?
    //     (<p style={{ color: '#ccc' }}> No messages... </p>) :
    //       (messages.map(({ name, body }, i) => (
    //         <Message name={name} isMe={name === me} message={body} key={i} />
    //       ))
    //       )
    // )

    // chane orginal displayMessages to displayChat
    // const displayChat = (chat) => (
    //     chat.length === 0 ?
    //         (<p style={{ color: '#ccc' }}> No messages... </p>) :
    //         (<ChatBoxWrapper> {
    //             chat.map(({ name, body }, i) => (
    //                 <Message name={name} isMe={name === me} message={body} key={i} />
    //             ))
    //         }
    //             <FootRef ref={msgFooter} />
    //         </ChatBoxWrapper>)
    // )

    // const extractChat = (friend) => {
    //     return displayChat(messages.filter(({ name, body }) => ((name === friend) || (name === me))))
    // }

    const createChatBox = (friend) => {
        if (chatBoxes.some(({ key }) => (key === friend))) {
            throw new Error(friend + "'s chat box has already opened.")
        }
        // const chat = extractChat(friend)
        // console.log(chat) // debug use
        const chat = <div></div>
        setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }])
        setMsgSent(true)
        return friend
    }

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => (key === activeKey))
        const newChatBoxes = chatBoxes.filter(({ key }) => (key != targetKey))
        setChatBoxes(newChatBoxes)

        var returnVal = ''
        if (activeKey) {
            if (activeKey === targetKey) {
                if (index !== 0) {
                    returnVal = chatBoxes[index - 1].key
                }
            } else {
                returnVal = activeKey
            }
        }

        return returnVal
    }

    // ?. if object exist => return things after .
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: "start" })
    }

    // update usrname
    useEffect(() => {
        const new_name = (user_name) ? user_name : ((savedUsername) ? savedUsername : "Guest_1234")
        setUsrname(new_name)
        // console.log("set usrname to", usrname)
    }, [user_name])

    useEffect(() => {
        // console.log("trigger scrolling")
        scrollToBottom();
        setMsgSent(false)
    }, [msgSent])

    useEffect(() => {
        let new_chatboxes = chatBoxes
        for (let i = 0; i < new_chatboxes.length; ++i) {
            if (new_chatboxes[i].key === activeKey) {
                let chat =
                messages.length === 0 ?
                    (<p style={{ color: '#ccc' }}> No messages... </p>) :
                    (<ChatBoxWrapper> {
                        messages.map(({ name, body }, i) => (
                            <Message name={name} isMe={name === usrname} message={body} key={i} />
                        ))
                    }
                        <FootRef ref={msgFooter} />
                    </ChatBoxWrapper>)
                new_chatboxes[i].children = chat
            }
        }
        setMsgSent(true)
        setChatBoxes(new_chatboxes)
    }, [messages])

    return (
        <Fragment>
            <Title name={usrname} />
            <Fragment>
                <ChatBoxesWrapper
                    tabBarStyle={{ height: '36px' }}
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => {
                        setActiveKey(key)
                        // extractChat(key)
                        startChat(usrname, key)
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === 'add') setModalOpen(true) // click the 'plus' button
                        else if (action === 'remove') { // click the 'X' button
                            setActiveKey(removeChatBox(targetKey, activeKey))
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name))
                        // extractChat(name)
                        setModalOpen(false)
                        startChat(usrname, name)
                    }}
                    onCancel={() => {
                        setModalOpen(false)
                    }}
                />
            </Fragment>
            <Input.Search
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a message body.'
                        })
                        return
                    } else if (activeKey === '') {
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox.'
                        })
                        setMsg('')
                        return
                    }
                    // sendMessage({ name: me, body: msg })
                    sendMessage(usrname, activeKey, msg)
                    // console.log(msg)
                    setMsg('')
                    setMsgSent(true) // trigger useEffect to scrollToBottom
                }}
            ></Input.Search>
        </Fragment>
    )
}

export default ChatRoom
