/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  function Start_button(startGameOnClick){
    return <button className='btn' onClick={startGameOnClick}>start</button>
  }
  function Difficult_button(){
    let click=()=>{
      setShowPanel(true)
    }
    return <button className='btn' onClick={click}>Difficulty</button>
  }
  function Panel(){
    function Mine(){
      return <input type = 'range' min="1" max="20"  defaultValue="10" ></input>
    }
    function Board(){
      return <input type = 'range' min = '1' max = '15' defaultValue = '8'  ></input>
    }
    // let input_1=mine()
    // let input_2=board()
    return <div className='controlWrapper'>
      <p>mineNum</p>
      <Mine></Mine>
      <p>boardSize</p>
      <Board></Board>
    </div>
  }
   
  const start_button=Start_button(startGameOnClick)
  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {start_button}
      <div className='contralContainer'>
        <Difficult_button></Difficult_button>
        {showPanel?<Panel></Panel>:<div></div>}
      </div>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}

    </div>
  );

}
export default HomePage;   