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


const Board = ( boardSize, mineNum, backToHome,startGame) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.
    const [cell_list,setCelllist]=useState([])
    useEffect(() => {
        // Calling the function
        console.log('check')
        freshBoard();
    }, []);
    useEffect(() => {
        // Calling the function
        console.log('check2')
        freshBoard();
    }, [boardSize,mineNum]);
    useEffect(() => {
        // Calling the function
        if(board.length>0){
        setCelllist(Cell_list(board))
        }
    }, [board]);

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
    // var newBoard = JSON.parse(JSON.stringify(board));
    // var Count=0
    // const smart=(x,y)=>{
    //     Count++
    //     console.log(Count)
    //     newBoard[x][y].revealed=true
    //     if(newBoard[x][y].value===0){
    //         if(x<boardSize-1 && !newBoard[x+1][y].revealed && !newBoard[x+1][y].flagged){
    //                 smart(x+1,y)
    //         }
    //         if(y<boardSize-1 && !newBoard[x][y+1].revealed && !newBoard[x][y+1].flagged){
    //                 smart(x,y+1)
    //         }
    //         if(x>0 && !newBoard[x-1][y].revealed && !newBoard[x-1][y].flagged){
    //                 smart(x-1,y)
    //         }
    //         if(y>0 && !newBoard[x][y-1].revealed && !newBoard[x][y-1].flagged){
    //                 smart(x,y-1)
    //         }
    //     }
    // }
    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        for(let i=0;i<mineLocations.length;i++){
            if(x===mineLocations[i][0] && y===mineLocations[i][1]){
                setGameOver(true)
            }
        }
        
        // newBoard[x][y].revealed=true
        // =======smart=======
        var Count=0
        const smart=(x,y)=>{
            Count++
            console.log(Count)
            newBoard[x][y].revealed=true
            if(newBoard[x][y].value===0){
                if(x<boardSize-1 && !newBoard[x+1][y].revealed && !newBoard[x+1][y].flagged){
                        smart(x+1,y)
                }
                if(y<boardSize-1 && !newBoard[x][y+1].revealed && !newBoard[x][y+1].flagged){
                        smart(x,y+1)
                }
                if(x>0 && !newBoard[x-1][y].revealed && !newBoard[x-1][y].flagged){
                        smart(x-1,y)
                }
                if(y>0 && !newBoard[x][y-1].revealed && !newBoard[x][y-1].flagged){
                        smart(x,y-1)
                }
            }
        }
        smart(x,y)
        // ========smart=======
        setBoard(newBoard)

        let newnonmine=nonMineCount-Count
        if(newnonmine===0 && !gameOver){
            setWin(true)
        }
        setNonMineCount(newnonmine)

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

    };


    // ==============new component==========
    const Cell_list =(board)=>{
        console.log(board)
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
        return res_list
    }
    const Dash=Dashboard(remainFlagNum,gameOver,win,startGame)
    return (
        <div>
            <div className='boardPage' >
                <div className='boardWrapper' >
                    <div className='boardContainer'>
                        {Dash}
                        {cell_list}
                    </div>
                </div>
            </div>
            {(gameOver || win)?<div className='modal'>
                <div className='modalWrapper'>
                    <div className='modalContent'>
                        <div className='modalResult'>
                            {(gameOver && !win)?"Game over":(!gameOver && win)?'Win':''}
                        </div>
                        <div className='modalBtnWrapper'>
                            {(gameOver && !win)?<div className='modalBtn' onClick={restartGame}>try again</div>:(!gameOver && win)?
                            <div className='modalBtn' onClick={restartGame}>new game</div>:<div></div>}
                            {(gameOver || win)?<div className='modalBtn' onClick={backToHome}>backToHome</div>:<div></div>}
                        </div>
                    </div>
                </div>
            </div>:<div></div>}
        </div>
    );



}

export default Board