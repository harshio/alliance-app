import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {useNavigate} from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const currQuestion = 0;
  const handleSubmit = () => {
    navigate('/questions', {state: { currQuestion, name }});
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
