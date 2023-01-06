import { useEffect, useState, createContext, useContext } from "react";
import { message } from 'antd'

const wss_port = process.env.WSS_PORT || 4001 // changing from 4000 to 4001
const wss_link = (process.env.NODE_ENV === "production") 
                  ? (window.location.href).replace("http", "ws")
                  : 'ws://localhost:' + wss_port;

const client = new WebSocket(wss_link)
client.onopen = () => console.log('Backend socket server connected.')

const LOCALSTORAGE_KEY = "save-me" // save the user name
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
    setSignedIn: () => {},
    displayStatus: () => {},
})

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [me, setMe] = useState(savedMe || '');
    const [signedIn, setSignedIn] = useState(false);
    const [status, setStatus] = useState({});

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                // console.log("init_payload: ", payload)
                setMessages(payload);
                break;
            }
            case "output": {
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: break;
        }
    }

    const sendMessage = (name, to, body) => {
        console.log('hi')
        if(!name || !to || !body) throw new Error('Name or To or Body required.')
        sendData(["message", {name, to, body}]);
    }

    // const sendOpenChatbox = (payload) => {
    //     console.log(payload); // payload = chatbox's name
    //     sendData(["chat", payload]);
    // }

    const startChat = (name, to) => {
        if(!name || !to) throw new Error('Name or To required.')
        sendData(["chat", {name, to}]);
    }

    const sendData = async (data) => {
        console.log(data)
        await client.send(JSON.stringify(data));
    };

    const clearMessages = () => {
        sendData(["clear"]);
    }

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = { content: msg, duration: 0.5 }
            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'error':
                default:
                    message.error(content)
                    break
            }
        }
    }

    useEffect(() => {
        if(signedIn)
            localStorage.setItem(LOCALSTORAGE_KEY, me) // LOCALSTORAGE_KEY = me
    }, [signedIn])

    return(
        <ChatContext.Provider
        value={{
            status,
            me,
            signedIn,
            messages,
            startChat,
            sendMessage,
            clearMessages,
            setSignedIn,
            displayStatus, 
        }}
        {...props}
        />
    )
}

const useChat = () => useContext(ChatContext)

export { ChatProvider, useChat }