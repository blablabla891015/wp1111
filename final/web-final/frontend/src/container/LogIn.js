import '../css/login.css';
import { useUser } from '../container/hooks/useUser';
import { useRef, React,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from './instance';
import hash from '../util/hash256'

const LogIn = () => {

    const navigate = useNavigate();
    const {setCurrentPage, setLogin, username, setUsername, password, setPassword,setUserId,login} = useUser();
    const username_ref = useRef(null);
    const password_ref = useRef(null);

    useEffect(()=>{
        if(login)navigate('/')
    },[login])
    const handleLogIn = async () => {
        const hash_password = await hash(password)
        const data = await instance.get('/login', {params:{user_name:username, password:hash_password}});

        
        if (data.data.contents.message === 'User found') {
            // console.log('check')
            setPassword(password);
            setUsername(username);
            setLogin(true);
            setUserId(data.data.contents.id)

        } else {
            setPassword('');
            setUsername('');
        }

        username_ref.current.value = '';
        password_ref.current.value = '';
    }

    return(
        <div class="logIn">
            <div class="logIn_container">
                <p id="logIn_title">Log In</p>
                <div class="logIn_btn" id="logIn_w_google">
                    <div class="logIn_line" id="logIn_btn_underline"></div>
                    <div class="logIn_line" id="logIn_btn_upperline"></div>
                    <p>Click for Nothing</p>
                </div>
                <div class="logIn_section">
                    <div class="logIn_section_line"></div>
                    <p>OR</p>
                </div>
                <div class="logIn_log">
                    <p>Username</p>
                    <input placeholder="Enter your username..."
                    onChange={(e) => setUsername(e.target.value)}
                    ref={username_ref}
                    />
                </div>
                <div class="logIn_log">
                    <p>Password</p>
                    <input type="password" placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                    ref={password_ref}
                    />
                </div>
                <div class="logIn_btn" id="logIn_submit"
                onClick={() => handleLogIn()}
                >
                    <div class="logIn_line" id="logIn_btn_underline"></div>
                    <div class="logIn_line" id="logIn_btn_upperline"></div>
                    <p>Log In</p>
                </div>
                <div class="logIn_btm">
                    <p>Don't have an account yet?</p>
                    <p id="logIn_signup_text"
                    onClick={e => {setCurrentPage('SignUp'); navigate('/SignUp');}}
                    >Sign Up</p>
                </div>
            </div>
        </div>
    )
}
export default LogIn;