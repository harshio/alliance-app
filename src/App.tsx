import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {useNavigate, useLocation} from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const currQuestion = 1;
  const pointTotal = 0;
  const location = useLocation() as {state: {newEntry: number, thisSize: number}};
  const setNumber = location.state.newEntry;
  const setSize = location.state.thisSize;
  const handleSubmit = () => {
    navigate('/questions', {state: { currQuestion, name, pointTotal, setNumber, setSize }});
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
      </div>

    </div>
  );
}

export default App;
