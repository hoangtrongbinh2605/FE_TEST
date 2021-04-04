import './App.css';
import React,{ Component } from 'react';

interface PropsApp {

}
class App extends Component <PropsApp,{}>{
  constructor(props:PropsApp){
    super(props)
  }
  render(){
    return (
      <>
      {this.props.children}      
      </>
    )
  }
}

export default App;
