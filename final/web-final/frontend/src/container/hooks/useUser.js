import { useState, useContext, createContext, useEffect, useId } from "react";
import { Button, Input, Tag, message } from 'antd'
var saveUsrname=localStorage.getItem('username')
var saveLogin=JSON.parse(localStorage.getItem('login'))
var saveUsrid=parseInt(localStorage.getItem('id'))

const UserContext = createContext({
   status: {},
   setStatus: () => { },

   userId: -1,
   setUserId: () => { },

   username: '',
   setUsername: () => { },

   email: '',
   setEmail: () => { },

   password: '',
   setPassword: () => { },

   passwordComf: '',
   setPasswordComf: () => { },

   login: false,
   setLogin: () => { },

   currentPage: 'Home',
   setCurrentPage: () => { }
});

const UserProvider = (props) => {

   const [status, setStatus] = useState({});
   const [userId, setUserId] = useState(-1)
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [passwordComf, setPasswordComf] = useState('');
   const [login, setLogin] = useState(false);
   const [currentPage, setCurrentPage] = useState('Home');  // marks current page, mainly for navbar

   const displayStatus = (s) => {
      if (s.msg) {
         const { type, msg } = s;
         const content = {
            content: msg, duration: 0.5
         }
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
         }
      }
   }


   // initialize username and login to saved-value
   useEffect(() => {
      setUsername(saveUsrname)
      setLogin(saveLogin)
      setUserId(saveUsrid)
      console.log(userId)
      // console.log("init name to: ", saveUsrname)
      // console.log("init login to: ", saveLogin)
   }, [])

   // update localStorage once login changes
   useEffect(() => {
      localStorage.setItem('login', login)
      if (login){
         localStorage.setItem('username', username)
         localStorage.setItem('id', userId)
      }
      else {
         localStorage.setItem('username', "")
         localStorage.setItem('id', -1)

      }
      
      // console.log("set login to: ", login)
      // console.log("set username to: ", username)
   }, [login])
   // useEffect(
   //    ()=>{
   //       console.log(userId)
   //    },[userId]
   // useEffect(() => {
   //    // if(login){
   //    //    localStorage.setItem(LOCALSTORAGE_USERNAME, username)
   //    //    console.log("set name to: ", username)
   //    // }
   //    localStorage.setItem('username', username)
   //    console.log("set username to: ", username)
   // }, [username])
   

   useEffect(() => {
      displayStatus(status)
   }, [status])
   return (
      <UserContext.Provider
         value={{
            status, setStatus,
            userId, setUserId,
            username, setUsername,
            email, setEmail,
            password, setPassword,
            passwordComf, setPasswordComf,
            login, setLogin,
            currentPage, setCurrentPage
         }}
         {...props}
      />
   );
};
const useUser = () => useContext(UserContext);
export { UserProvider, useUser };