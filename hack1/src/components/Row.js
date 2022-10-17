/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React, { useEffect, useState } from 'react';


const Row = ({ guess, rowIdx }) => {
    const [filled,setFilled]=useState(false)
    const [classname,setClassname]=useState('Row-wordbox')
    const [letters,setLetters]=useState([])
    let x=[0,1,2,3,4]
    useEffect(()=>{
        setClassname('Row-wordbox filled')
        // console.log(letters)
    },[filled]

    )
    // let classname='Row-wordbox'
    if(guess !== undefined && !filled && guess!==null){
        console.log(guess)
        setFilled(true)
        if(guess!==null){
            setLetters(guess)
        }
    }

    function Wrapper(){
        return <div className="Row-wrapper">
            {x.map((value)=>(<div className={classname} key={rowIdx+"_"+value} id={rowIdx+"_"+value}>{(filled)?letters[value]:""}</div>))}
        </div>
    }
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            <Wrapper></Wrapper>
            {/* ↓ Default row, you should modify it. ↓ */}
            {/* <div className='Row-wrapper'>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
            </div> */}
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;