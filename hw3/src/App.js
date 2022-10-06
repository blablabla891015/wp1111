
import './App.css';
import React from 'react';
class Todo_items extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Thing:<h1 className='todo-app__item-detail'>{this.props.thing}</h1>
    }
  }
  inline=(e)=>{
    if(e.target.checked){
      // console.log("check")
      // this.setState(s=>({count_child: s.count_child-1}))
      this.setState(s=>({Thing:<h1 className='todo-app__item-detail' style={{textDecoration:"line-through",opacity:0.5}}>{this.props.thing}</h1>}))
    }
    else{
      // this.setState(s=>({count_child: s.count_child+1}))
      this.setState(s=>({Thing:<h1 className='todo-app__item-detail'>{this.props.thing}</h1>}))
    }
    // this.props.handelchange()
  }
  combine=(e)=>{
    this.inline(e)
    this.props.handelchange(e)

  }
  render(){
    return <li className='todo-app__item'>
      <div className='todo-app__checkbox'>
        <input type={'checkbox'}  id={this.props.id} onChange={this.combine}></input>

        <label htmlFor={this.props.id}></label>
      </div>
      {this.state.Thing}
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
      lis:props.lis,
      count_child:props.count_child
    }
  }
  render(){
    return <footer className='todo-app__footer'>
    <Todo_app_total lis={this.props.lis} count_child={this.props.count_child}></Todo_app_total>
    <ul className='todo-app__view-buttons'></ul>
    <div className='todo-app__clean'></div>
  </footer>
  }
}
class Todo_app_total extends React.Component{
  constructor(props){
    super(props)
    this.state={
      lis:props.lis,
      count_child:props.count_child
    }
  }
  render(){
    return <div className='todo-app__total'>{this.props.count_child}</div>
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
      this.state.lis.push(<Todo_items key={this.state.count_child+1} thing={e.target.value} id={this.state.count_child+1} 
      handelchange={this.handelchange}></Todo_items>)
      this.setState(s=>({lis:s.lis}))
      console.log(this.state.count_child)
      this.setState(s=>({count_child: s.count_child+1}))
    }
  }
  handelchange=(e)=>{
    console.log(e)
    if(e.target.checked){
      console.log("check")
      this.setState(s=>({count_child: s.count_child-1}))
      this.setState(s=>({Thing:<h1 className='todo-app__item-detail' style="text-decoration: line-through; opacity: 0.5;">{this.props.thing}</h1>}))
    }
    else{
      this.setState(s=>({count_child: s.count_child+1}))
      this.setState(s=>({Thing:<h1 className='todo-app__item-detail'>{this.props.thing}</h1>}))
    }

  }
  render(){
    return <div className="todo-app__root">
    <header className="todo-app__header">
      <p className='todo-app__title'>todos</p>
    </header>
    <Todo_app_main lis={this.state.lis} count_child={this.state.count_child} keypress={this.keypress}></Todo_app_main>
    <Todo_app_footer lis={this.state.lis} count_child={this.state.count_child}></Todo_app_footer>
  </div>
  }

}
function App() {
  return (
    <Todo_app_root></Todo_app_root>
  );
}
export default App;
