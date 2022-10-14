/****************************************************************************
  FileName      [ MineSweeper.js ]
  PackageName   [ src/containers ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ The control and main page of MineSweeper. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './MineSweeper.css';
import Board from '../components/Board'
import React, { Component, useEffect, useState } from 'react';
import HomePage from '../components/HomePage'
var a=0;
var b=0;
const MineSweeper = () => {
    const [startGame, setStartGame] = useState(false);      // A boolean variable. If true, show `Board`, else show `HomePage`.
    const [mineNum, setMineNum] = useState(10);             // A integer variable to store the number of mines in the game. The default value is 10.
    const [boardSize, setBoardSize] = useState(8);          // A integer variable to store the board size in the game. The default value is 8.

    useEffect(()=>{
        if(a !==0){
            setMineNum(a)
        }
        if(b !==0){
            setBoardSize(b)
        }
    },[startGame])
    // Basic TODO: Change `startGame` from false to true when this function is called
    const startGameOnClick = () => {
        setStartGame(true)
    }
    
    // Advanced TODO: Change `mineNum` to the number you send by this function
    const mineNumOnChange = (e) => {
        a=e.target.value
        // setMineNum(e.target.value)
        
    }

    // Advanced TODO: Change `boardSize` to the number you send by this function
    const boardSizeOnChange = (e) => {
        b=e.target.value
        // setBoardSize(e.target.value)
        
    }

    // Advanced TODO: Change `startGame` from true to false when this function is called
    const backToHomeOnClick = () => {
        setStartGame(false)
        
    }
    // ==============Component=============
    const homePage=HomePage({startGameOnClick,mineNumOnChange,boardSizeOnChange,mineNum,boardSize})
    const board=Board(boardSize,mineNum,backToHomeOnClick,startGame)
    // ==============Component=============
    return (
        <div className='mineSweeper'>
            {startGame?board:homePage}

        </div>
    );
}
export default MineSweeper;