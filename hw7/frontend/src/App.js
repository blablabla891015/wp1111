import './App.css'
import { useState ,useEffect } from 'react'
import { Button, Input, Tag ,message} from 'antd'
import {useChat} from './useChat'
import styled from 'styled-components'
import SignInpage from './containers/SignIn'
import ChatRoom from './containers/ChatRoom'
const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`
const App=()=> {
  const { SignIn,setSignIn} = useChat()
  // useEffect(()=>{console.log('check')},[status])
  return (
    <Wrapper>{!SignIn?<SignInpage></SignInpage>:<ChatRoom></ChatRoom>}</Wrapper>
  )
}

export default App
