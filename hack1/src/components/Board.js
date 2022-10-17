/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    let y=[0,1,2,3,4,5]
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {y.map((value)=>(!(turn===value)?<Row id={"row_"+value} key={"row_"+value} guess={guesses[value]} rowIdx={value}></Row>:
            <CurRow id={"row_"+value} key={"row_"+value} curGuess={curGuess} rowIdx={value}></CurRow>))}
            
            
        </div>
    )
};
export default Board;
