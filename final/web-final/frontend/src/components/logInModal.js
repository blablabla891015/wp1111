import '../css/logInModal.css';
// import { useData } from '../container/useData';
import instance from '../container/instance';
import { useUser } from '../container/hooks/useUser';
import { useRef } from 'react';
const LogInModal = ({logInModalopen,setLogInModalopen}) => {
    const {user_name,setUser_name,password,setPassword,setLogin}=useUser()
    const user_name_ref=useRef(null)
    const password_ref=useRef(null) 
    const handle_login=async()=>{
        const {data}=await instance.get('/login',{params:{user_name,password}}) 
        if(data.contents==='User found'){
            setPassword(password)
            setUser_name(user_name)
            setLogin(true)
            setLogInModalopen(false)
        }
        else{
            setPassword('')
            setUser_name('')
        }
        user_name_ref.current.value=''
        password_ref.current.value=''
    }
    return(
        <div>
            {(!logInModalopen)?(null):(
                <div className='modalScreenBlockage'>
                    <div className='loginModal'>
                    <div className="modalSeg" id="filled"></div>
                    <div className="modalSeg">
                        <div className="exitBlock">
                            <div className='exitButton' onClick={()=>setLogInModalopen(false)} >X</div>
                        </div>
                        <div className="loginBlock">
                           
                            <div className="textBlock">
                                <h1>Sign in to Mutopia</h1>
                                <p>Be inspired by musicians around the world.</p>
                            </div>
                            <div className="inputBlock">
                                <p>email</p>
                                <input/>
                            </div>
                            <div className="inputBlock">
                                <p>user name</p>
                                <input onChange={(e)=>setUser_name(e.target.value)} ref={user_name_ref}/>
                            </div>
                            <div className="inputBlock">
                                <p>password</p>
                                <input onChange={(e)=>setPassword(e.target.value)} ref={password_ref}/>
                            </div>
                            <div className="button" id="toSignUp" >Don't have an account? Sign up here</div>
                            <div className="button" id="loginBtn" onClick={()=>{handle_login()}}>Login</div>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default LogInModal