import './App.css';
import { useState,useRef } from 'react';
import { guess, startGame, restart } from './axios'
function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const InputRef=useRef(null)
  const handleStart=async()=>{
    const response=await startGame()
    console.log(response)
    if(response==='The game has started'){
      setHasStarted(true)
    }
  }
  const handleGuess = async() => {
    const response = await guess(number)
    if (response === 'Equal') setHasWon(true)
    else {
    setStatus(response)
    setNumber('')
    }
    InputRef.current.value=''
  }
  const handleInput=(e)=>{
    setNumber(e.target.value)
  }
  const handleRestart=async()=>{
    const response = await restart()
    if (response === 'The game has restarted') setHasWon(false)
    else {
    setStatus(response)
    setNumber('')
    }

  }
  const startMenu =<div><button onClick = {handleStart} > start game </button></div>

  const gameMode =<>
 <p>Guess a number between 1 to 100</p>
 <input onChange={handleInput} ref={InputRef}></input>
 <button // Send number to backend
 onClick={handleGuess}
 disabled={!number}
 >guess!</button>
 <p>{status}</p>
 </>

 const winningMode = (
  <>
  <p>you won! the number was {number}</p>
  <button onClick={handleRestart} >restart</button>
  </>
  )
  const game=<div>{hasWon?winningMode:gameMode}</div>
  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
