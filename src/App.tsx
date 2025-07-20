import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {useNavigate, useLocation} from 'react-router-dom';
import useWebSocket from './useWebSocket';

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const currQuestion = 1;
  const pointTotal = 0;
  const location = useLocation() as {state: {newEntry: number, thisSize: number}};
  const setNumber = location.state.newEntry;
  const setSize = location.state.thisSize;
  const [inActive, setInActive] = useState(false);
  const { connect, disconnect, send } = useWebSocket();
  const handleSubmit = () => {
    console.log("Hello");
    //player client will connect to server here
    //only if useRef.current equals setNumber, can we connect to the server and navigate to the page
    const checking = Number(localStorage.getItem("activeSetNumber"));
    if(checking === setNumber){
      connect(name);
      navigate('/questions', {state: { currQuestion, name, pointTotal, setNumber, setSize }});
    }
    else{
      setInActive(true)
    }
  }
  //apparently you can pass in states when you navigate
  return (
    <div className="App">
      <div className="titleBar">
        <h1>Alliance</h1>
      </div>
      <div className="nameEntry">
        <p>Write your name here</p>
        <input type="text" name="username" placeholder="Abraham Lincoln"
        value = {name} onChange = {(e) => setName(e.target.value)}/>
        <div className="button" onClick = {handleSubmit}>Submit</div>
        {inActive && <p>Put in the Game ID of an active session</p>}
      </div>

    </div>
  );
}

export default App;
