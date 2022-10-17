/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');
    let x=[0,1,2,3,4]
    function Wrapper(){
        return <div className="Row-wrapper current">
            {x.map((value)=>(<div className='Row-wordbox' key={rowIdx+"_"+value} id={rowIdx+"_"+value}>{letters[value]}</div>))}
        </div>
    }
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <Wrapper></Wrapper>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
