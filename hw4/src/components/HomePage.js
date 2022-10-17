/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useEffect, useRef, useState } from 'react';
var x=10
var y=8
const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize,a,b/* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);
  const [abletostart,setable] =useState(true)
           // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  function Start_button(startGameOnClick){
    return <button className='btn' onClick={()=>{if(abletostart){
      startGameOnClick()
    }}}>start</button>
  }
  class Control_panel extends React.Component{
    constructor(){
      super()
      this.state={
        mine_value:10,
        board_value:8
      }
    }
    set_error(){
      if(x>y**2){
        setError(true)
        setable(false)
      }
      else{
        setError(false)
        setable(true)
      }
    }
    setN(){
      x=this.state.mine_value
      y=this.state.board_value
    }

    render(){
      return <div className='controlPanel'>
      <div className='controlCol'>
        <p className='controlTitle'>mineNum</p>
        <input type = 'range' min="1" max="20"  defaultValue={x} onInput={(e)=>{mineNumOnChange(e);
          this.setState({mine_value:e.target.value});this.setN();this.set_error()}}></input>
        {!error?<p className='controlNum' style={{color:"#0f0f4b"}}>{this.state.mine_value}</p>:<p className='controlNum' style={{color:"#880000"}}>{x}</p>}
      </div>
      <div className='controlCol'>
        <p className='controlTitle'>boardSize</p>
        <input type = 'range' min = '1' max = '40' defaultValue = {y}  onInput={(e)=>{boardSizeOnChange(e);
          this.setState({board_value:e.target.value});this.setN();this.set_error()}}></input>
        {!error?<p className='controlNum' style={{color:"#0f0f4b"}}>{this.state.board_value}</p>:<p className='controlNum' style={{color:"#880000"}}>{y}</p>}
      </div>
    </div>
    }
  }
  function Difficult_button(){
    let click=()=>{
      setShowPanel(true)
    }
    return <button className='btn' onClick={click}>Difficulty</button>
  }
  function Panel(){
    // function Mine(){
    //   return <input type = 'range' min="1" max="20"  defaultValue="10" onInput={mineNumOnChange}></input>
    // }
    // function Board(){
    //   return <input type = 'range' min = '1' max = '15' defaultValue = '8'  onInput={boardSizeOnChange}></input>
    // }
    // let input_1=mine()
    // let input_2=board()
    
    // let con=new Control_panel()
    return <div className='controlWrapper'>
      <div className='error'>{error?<p style={{color:'#880000'}}>please reset</p>:""}</div>
      <Control_panel></Control_panel>
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

    </div>
  );

}
export default HomePage;   