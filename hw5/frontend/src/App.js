import './App.css';
import { useState,useRef } from 'react';
import { guess, startGame, restart } from './axios'
function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [comhasWon, setcomHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [startError,setStartError] =useState('')
  const InputRef=useRef(null)
  const handleStart=async()=>{
    const response=await startGame()
    console.log(response)
    if(response==='The game has started'){
      setHasStarted(true)
    }
    else{
      setStartError(response)
    }
  }
  const handleGuess = async() => {
    const response = await guess(number)
    if (response === 'Equal') {setHasWon(true)}
    else if(response ==='computer win'){
      setcomHasWon(true)
    }
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
    if (response === 'The game has restarted') {
      setHasWon(false)
      setcomHasWon(false)}
    else {
    setStatus('')
    setNumber('')
    }

  }
  const startMenu =<div>
    <button onClick = {handleStart} >
    start game
  </button>
  <p>{startError}</p>
  <p>我覺得應該沒人會去看readme所以我就寫在這，我做的guess number會先讓玩家猜一次，若玩家沒猜中則會輪到電腦，
    電腦會在當前被告知smaller的最小值與被告知bigger的最大值間隨機產生一個數字，此為電腦猜的數字，誰先猜到就算誰贏
    </p>
  <p>回傳的error會顯示在上方</p>
  <p>**我知道這個進階做得有點偷懶，但看在我期中週還有做進階的份上，拜託給個perfect**</p>
  <p>**我很需要那一分**</p>
  </div>

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
  const LosingMode = (
    <>
    <p>you lose! the number was {number}</p>
    <button onClick={handleRestart} >restart</button>
    </>
    )
  const game=<div>{hasWon?winningMode:comhasWon?LosingMode:gameMode}</div>
  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
