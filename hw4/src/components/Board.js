/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        setBoard(newBoard['board'])
        setMineLocations(newBoard['mineLocations'])
        setRemainFlagNum(mineNum)
        setNonMineCount(boardSize*boardSize-mineNum)
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.

    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        console.log("right")
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        console.log(remainFlagNum)
        if(remainFlagNum>0 && !board[x][y].revealed){
            newFlagNum=remainFlagNum-1
            console.log(newBoard[x][y].flagged)
            newBoard[x][y].flagged=true
            console.log(newBoard[x][y].flagged)
        }
        setBoard(newBoard)
        setRemainFlagNum(newFlagNum)
        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        for(let i=0;i<mineLocations.length;i++){
            if(x===mineLocations[i][0] && y===mineLocations[i][1]){
                setGameOver(true)
            }
        }
        
        newBoard[x][y].revealed=true
        setBoard(newBoard)
        setNonMineCount(nonMineCount-1)
        if(setNonMineCount===0){
            setWin(true)
        }

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

    };


    // ==============new component==========
    const Cell_list =()=>{
        let res_list=[]
        for(let x=0;x<boardSize;x++){
            let subrow=[]
            for(let y=0;y<boardSize;y++){
                let celldetail=board[x][y]
                var newCell=Cell(x,y,celldetail,updateFlag,revealCell)
                subrow.push(newCell)

            }
            let id="row"+x.toString()
            res_list.push(<div key={id} id={id} style={{display:"flex"}}>
                {subrow}
            </div>)
        }
        return <div>
            {res_list}
        </div>
    }
    const Dash=Dashboard(remainFlagNum,gameOver)
    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                <div className='boardContainer'>
                    {Dash}
                    <Cell_list></Cell_list>
                </div>
            </div>
        </div>
    );



}

export default Board