import Title from "../compenents/Title";
import LogIn from "../compenents/LogIn";
import {useChat}  from "../useChat";
const SignIn=()=>{
    const {Me,setSignIn,setMe,displayStatus}=useChat()
    const handleLogin = (name) => {
        if (!name)
        displayStatus({
        type: "error",
        msg: "Missing user name",
        });
        else setSignIn(true);
    }
    return(
        <>
        <Title></Title>
        <LogIn me={Me} setName={setMe} onLogin={handleLogin}></LogIn>
        </>
    )
} 
export default SignIn;