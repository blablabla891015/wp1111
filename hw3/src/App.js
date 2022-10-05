import logo from './logo.svg';
import './App.css';
import React from 'react'
import ReactDOM from 'react-dom/client';
class abc extends React.Component{
  constructor(){
    this.node =document.createElement("div")
  }
  render(){
    return <h1>hello</h1>
  }
}
function App() {
  return (
    <div className="todo-app__root">
      <header className="todo-app__header">

      </header>
      <section className='todo-app__main'>
        <input className='todo-app__input'></input>
        <ul className='todo-app__list' itemID='todo_list'></ul>
      </section>
      <footer className='todo-app__footer'>
        <div className='todo-app__total'></div>
        <ul className='todo-app__view-buttons'></ul>
        <div className='todo-app__clean'></div>
      </footer>
    </div>
  );
}

export default App;
