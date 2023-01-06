import '../css/signup.css';
import { useUser } from '../container/hooks/useUser';
import { useRef, React,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from './instance';
import axios from 'axios';
import hash from '../util/hash256'

const SignUp = () => {

    const navigate = useNavigate();
    const { setCurrentPage, username, setUsername, email, setEmail, password, setPassword, passwordComf, setPasswordComf ,login,setLogin,setUserId} = useUser();
    const username_ref = useRef(null);
    const password_ref = useRef(null);
    const passwordComf_ref = useRef(null);
    const email_ref = useRef(null);
    const photo_ref = useRef(null);

    useEffect(()=>{
        if(login)navigate('/')
    },[login])
    const handleSignUp = async () => {
        const photo = document.getElementById("photo").files[0];
        if(!username || !password || !passwordComf /* ||  !email */){
            alert("some required field is missing")
            return ;
        }
        if(password !== passwordComf){
            alert("password and password comfirmation not match!")
            return ;
        }
        
        const acceptable_domain_name = [".com", ".net", ".org"]
        if(email && (!email.includes("@") || !acceptable_domain_name.some(item => email.includes(item)))){
            alert("email format is wrong!")
            return ;
        }
        // console.log("original ps: ", password)
        const hash_password = await hash(password)
        // console.log("hash ps: ", hash_password)
        if (!email){
            if(!photo){ // w/o email, photo
                const {data:{message,contents}}=await instance.post('/Reg', {user_name:username, password:hash_password});
                if(message==='success'){
                    setPassword(password)
                    setUsername(username)
                    setLogin(true)
                    setUserId(contents.id)
                }else{
                    console.log(contents)
                    alert("user exist")
                }
            }else{ // w/o email, w photo
                const [url, hash] = await getURLfromPhoto(photo)
                // console.log("getting url: ", url)
                // console.log("getting hash: ", hash)
                const {data:{message,contents}}=await instance.post('/Reg', {user_name:username, password:hash_password, img_url:url});
                if(message==='success'){
                    setPassword(password)
                    setUsername(username)
                    setLogin(true)
                    setUserId(contents.id)
                }else{
                    console.log(contents)
                    alert("user exist")
                }
                // await deleteImg(hash) // if need to delete certain image from imgur
            }
        }else{
            if(!photo){ // with email, w/o photo
                const {data:{message,contents}}=await instance.post('/Reg', {user_name:username, password:hash_password, email:email});
                if(message==='success'){
                    // console.log('contens is',contents)
                    setPassword(password)
                    setUsername(username)
                    setLogin(true)
                    setUserId(contents.id)
                }else{
                    alert("user exist")
                }
            }else{ // with email, photo
                const [url, hash] = await getURLfromPhoto(photo)
                console.log("getting url: ", url)
                console.log("getting hash: ", hash)
                const {data:{message,contents}}=await instance.post('/Reg', {user_name:username, password:hash_password, img_url:url, email:email});
                if(message==='success'){
                    console.log()
                    setPassword(password)
                    setUsername(username)
                    setLogin(true)
                    setUserId(contents.id)
                }else{
                    alert("user exist")
                }
                // await deleteImg(hash) // if need to delete certain image from imgur
            }
        }

        // if (photo){ // sign in with "photo" information
        //     const [url, hash] = await getURLfromPhoto(photo)
        //     console.log("getting url: ", url)
        //     console.log("getting hash: ", hash)
        //     await instance.post('/Reg', {user_name:username, password:hash_password, img_url:url});
        //     await deleteImg(hash) // if need to delete certain image from imgur
        // }else { // sign in without "photo" information
        //     await instance.post('/Reg', {user_name:username, password:hash_password});
        // }
        
        // reset input fields
        username_ref.current.value = '';
        password_ref.current.value = '';
        passwordComf_ref.current.value = '';
        email_ref.current.value = '';
        photo_ref.current.value = '';
    }

    const getURLfromPhoto = async (photo) => {
        // receive process.env.CLIENT_ID from backend
        const client_id_res = await instance.get('/getClientID') 
        const client_id = client_id_res.data.client_id

        // prepare photo data that need to upload to imgur
        var formData = new FormData()
        // const photo = document.getElementById("photo").files[0];
        // console.log(photo);
        formData.append("image", photo);

        // check image size before uploading?
        
        // upload image to imgur
        try{
            const response = await axios({
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                data: formData,
                headers: {
                    Authorization: "Client-ID " + client_id,
                    Accept: "application/json",
                },
                mimeType: 'multipart/form-data'
            })
            return [response.data.data.link, response.data.data.deletehash]
        }catch(e){
            console.log(e)
        }
    }

    const deleteImg = async (img_hash) => {
        // receive process.env.CLIENT_ID from backend
        const client_id_res = await instance.get('/getClientID') 
        const client_id = client_id_res.data.client_id

        // delete image from imgur
        try{
            await axios({
                method: 'DELETE',
                url: 'https://api.imgur.com/3/image/' + img_hash,
                headers: {
                    Authorization: "Client-ID " + client_id,
                    Accept: "application/json",
                },
                mimeType: 'multipart/form-data'
            })
            // console.log("delete success")
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div class="signUp">
            <div class="signUp_container">
                <p id="signUp_title">Sign Up</p>
                <div class="signUp_log">
                    <p>Username</p>
                    <input
                        placeholder="Choose a username..."
                        onChange={(e) => setUsername(e.target.value)}
                        ref={username_ref}
                    />
                </div>
                <div class="signUp_log">
                    <p>Email</p>
                    <input
                        placeholder="Enter your email address..."
                        onChange={(e) => setEmail(e.target.value)}
                        ref={email_ref}
                    />
                </div>
                <div class="signUp_log">
                    <p>Password</p>
                    <input
                        placeholder="Enter your password..."
                        onChange={(e) => setPassword(e.target.value)}
                        ref={password_ref}
                        type="password"
                    />
                </div>
                <div class="signUp_log">
                    <p>Password Confirmation</p>
                    <input
                        placeholder="Enter your password again..."
                        onChange={(e) => setPasswordComf(e.target.value)}
                        ref={passwordComf_ref}
                        type="password"
                    />
                </div>
                <div class="signUp_log">
                    <p>Personal Icon</p>
                    <input type="file" id="photo" 
                    ref={photo_ref}
                    />
                </div>
                <div class="signUp_btn" id="signUp_submit"
                    onClick={() => handleSignUp()}
                >
                    <div class="signUp_line" id="signUp_btn_underline"></div>
                    <div class="signUp_line" id="signUp_btn_upperline"></div>
                    <p>Sign Up</p>
                </div>
                <div class="signUp_btm">
                    <p>Already have an account?</p>
                    <p id="signUp_signup_text"
                        onClick={e => { setCurrentPage('LogIn'); navigate('/LogIn'); }}
                    >Log In</p>
                </div>
            </div>
        </div>
    );
}
export default SignUp