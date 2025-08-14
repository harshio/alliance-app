import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import finalLogo from './Frame7.svg';
import background from './background.jpg';
import './App.css';
import Button from './Button';
import {useNavigate, useLocation} from 'react-router-dom';
import { useSocket } from './WebSocketContext';

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const currQuestion = 1;
  const pointTotal = 0;
  const [inActive, setInActive] = useState(false);
  const { connect, disconnect, send, latestMessage, subscribeToMessageType, activeSet } = useSocket();
  const location = useLocation() as {state: {entry: string}};
  const newEntry = location.state.entry;
  const setID = Number(newEntry);
  const [setSize, setSetSize] = useState(0);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const execute = async() => {  
        console.log("Wassup");
        console.log("Cheers");
        const setNumber = activeSet;
        console.log(setNumber);
        const setSize = await fetchData(setNumber);
        send({
          type: 'setSize',
          content: setSize
        });
        navigate('/room', {state: { currQuestion, name, pointTotal, setNumber, setSize }});
    };
    const fetchData = async(setNumber: number) => {
      const response = await fetch(`http://localhost:8000/api/size/${setNumber}`);
      const setSize = await response.json(); //this part works correctly, but setNumber is wrong a lot of the time
      return setSize;
    }
    if(checking && activeSet != -1){
      execute();
    }
  }, [checking, activeSet])

  const handleSubmit = async () => {
    console.log("Hello");
    try {
      const connected = await connect(name, setID); // throws on failure
      if (connected) setChecking(true);
    } catch (e) {
      navigate("/");
    }
  }

  //apparently you can pass in states when you navigate
  return (
    <div className="App">
      <div className="titleBar">
        <p className="cornerMessage">Write Your Name</p>
        <h1 className="title">Alliance</h1>
        <img className="wonky" src={finalLogo}/>
      </div>
      <div className="background-container">
        <img className="background" src={background} />
        <div className="overlay" />
        <div className="nameEntry">
          <p>Write your name here</p>
          <input type="text" name="username" placeholder="Abraham Lincoln"
          value = {name} onChange = {(e) => setName(e.target.value)}/>
          <Button text={'Start Game'} variation={''} onClick={handleSubmit}/>
          {inActive && <p>Put in the Game ID of an active session</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
