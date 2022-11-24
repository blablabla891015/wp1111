import Title from "../compenents/Title";
import LogIn from "../compenents/LogIn";
import Password from "../compenents/Password";
import {useChat}  from "../useChat";
import { useState } from "react";
import RegModal from "../compenents/RegModal";
import { Button} from 'antd'
const SignIn=()=>{
    const {Me,password,setSignIn,setMe,displayStatus,setPassword,sendLogin,sendReg}=useChat()
    const [regmodalOpen,setRegModalOpen]=useState(false)
    const handleLogin = (name) => {
        if (!name){
            displayStatus({
                type: "error",
                msg: "Missing user name",
                });
        }
        else setSignIn(true);
    }
    const handleLogin_password = (name,password) => {
        // console.log(name)
        // console.log(password)
        // sendLogin(name,password)
        if (!name){
            displayStatus({
                type: "error",
                msg: "Missing user name",
                });
        }
        else if (!password){
            displayStatus({
                type: "error",
                msg: "Missing password",
                });
        }
        else {
            sendLogin(name,password)
            // setSignIn(true);
        }
    }
    const handel_reg=({ name ,password}) => {
        sendReg(name,password)
    }

    return(
        <>
        <Title></Title>
        <LogIn me={Me} setName={setMe}></LogIn>
        <Password me={Me} password={password} setPassword={setPassword} onLogin={handleLogin_password}></Password>
        <Button onClick={()=>{handleLogin_password(Me,password)}} color='blue'>LogIn</Button>
        <Button onClick={()=>{setRegModalOpen(true)}} color='blue'>Regist</Button>
        <div></div>
        {/* <Button onClick={()=>{handleLogin_password(Me,password)}} color='blue'>abc</Button> */}
        <RegModal open={regmodalOpen}
            onCreate={handel_reg}
            onCancel={() => { setRegModalOpen(false);}}>

      </RegModal>
        </>
    )
} 
export default SignIn;