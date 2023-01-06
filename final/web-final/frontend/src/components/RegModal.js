import '../css/logInModal.css';
// import { useData } from '../container/useData';
import { useRef ,useState} from 'react';
import instance from '../container/instance';
import { useUser } from '../container/hooks/useUser';
const RegModal = ({RegModalopen,setRegModalopen}) => {
    const {user_name,setUser_name,password,setPassword}=useUser()
    const handle_signup=async()=>{
        await instance.post('/Reg', {user_name,password});
        // console.log('create check')
        user_name_ref.current.value=''
        password_ref.current.value=''
    }
    const user_name_ref=useRef(null)
    const password_ref=useRef(null) 
    return(
        <div>
            {(!RegModalopen)?(null):(
                <div className='modalScreenBlockage'>
                    <div className='loginModal'>
                    <div className="modalSeg" id="filled"></div>
                    <div className="modalSeg">
                        <div className="exitBlock">
                            <div className='exitButton' onClick={()=>setRegModalopen(false)} >X</div>
                        </div>
                        <div className="loginBlock">
                           
                            <div className="textBlock">
                                <h1>Sign up for Mutopia</h1>
                                <p>Be inspired by musicians around the world.</p>
                            </div>
                            {/* <div className="inputBlock">
                                <p>email</p>
                                <input/>
                            </div> */}
                            <div className="inputBlock">
                                <p>user name</p>
                                <input onChange={(e)=>{setUser_name(e.target.value)}} ref={user_name_ref}/>
                            </div>
                            <div className="inputBlock">
                                <p>password</p>
                                <input onChange={(e)=>{setPassword(e.target.value)}} ref={password_ref}/>
                            </div>
                            {/* <div className="button" id="toSignUp" >Don't have an account? Sign up here</div> */}
                            <div className="button" id="loginBtn" onClick={()=>{handle_signup()}}>Sign Up</div>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default RegModal