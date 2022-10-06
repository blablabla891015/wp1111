import logo from './logo.svg';
import './App.css';
import React from 'react'
import ReactDOM from 'react-dom';
class Todo_items extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return <li className='todo-app__item'>
      <div className='todo-app__checkbox'>
        <input type={'checkbox'} itemID="2"></input>

        <label htmlFor='2'></label>
      </div>
      {this.props.thing}
      </li>
  }
}
class Todo_app_main extends React.Component{
  constructor(props){
    super(props)
    this.state={
    lis:props.lis,
    count_child:props.count_child,
    keypress:props.keypress

  }
  }
     
  render(){
    return <section className='todo-app__main'>
      <input className='todo-app__input' onKeyPress={this.state.keypress} ></input>
      <ul className='todo-app__list'>{this.state.lis}</ul>
    </section>
  }
  
}
class Todo_app_footer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      lis:props.lis
    }
  }
  render(){
    return <footer className='todo-app__footer'>
    <Todo_app_total lis={this.state.lis}></Todo_app_total>
    <ul className='todo-app__view-buttons'></ul>
    <div className='todo-app__clean'></div>
  </footer>
  }
}
class Todo_app_total extends React.Component{
  constructor(props){
    super(props)
    this.state={
      lis:props.lis
    }
  }
  render(){
    return <div className='todo-app__total'>{this.state.lis.length}</div>
  }
}
class Todo_app_root extends React.Component{
  constructor(props){
    super(props)
    this.state={
      lis:[],
      count_child:0
    }
  }
  keypress=(e)=>{
    if(e.key==='Enter'){
      this.state.lis.push(<Todo_items key={this.state.count_child+1} thing={e.target.value} ></Todo_items>)
      this.setState(s=>({lis:s.lis}))
      this.setState(s=>({count_child: s.count_child+1}))
    }
  }
  render(){
    return <div className="todo-app__root">
    <header className="todo-app__header"></header>
    <Todo_app_main lis={this.state.lis} count_child={this.state.count_child} keypress={this.keypress}></Todo_app_main>
    <Todo_app_footer lis={this.state.lis}></Todo_app_footer>
  </div>
  }

}
function App() {
  return (
    <Todo_app_root></Todo_app_root>
  );
}
export default App;
