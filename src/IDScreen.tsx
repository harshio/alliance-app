import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Button from './Button';
import { useSocket } from './WebSocketContext';

function IDScreen(){
    const location = useLocation() as {state: {setIndex: number}};
    const unique = location.state.setIndex;
    const [visible, setVisible] = useState(true);
    const [timer, setTimer] = useState(false);
    const [time, setTime] = useState(30);
    const [questionsLeft, setQuestionsLeft] = useState(-1);
    const {connect, disconnect, send, latestMessage, subscribeToMessageType, setSize} = useSocket();
    const navigate = useNavigate();
    useEffect(() => {
        if(!timer) return;
        const intervalId = setInterval(() => {
          setTime(prevTime => prevTime - 1);
        }, 1000);
      
        const timeoutId = setTimeout(() => {
          clearInterval(intervalId); // stop interval after 30s
          send({
            type: "timeOut"
          });
          setQuestionsLeft(prev => prev - 1);
          setTime(30);
          setTimer(false);
          setTimeout(() => setTimer(true), 5000);
          console.log("This runs after 30 seconds");
        }, 30000);
      
        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };
      }, [timer]);
    //we'll put the timer conditional jsx back in later, but i wanna test out the timer first
    useEffect(() => {
        //ok so this bizarre ass error has nothing to do with unsubscribe
        //good. alright, so it seems that for whatever reason, waiting for the timer
        //to run out results in subsequent questions finishing automatically for everyone
        //as soon as at least one player runs out of time.
        const unsubscribe = subscribeToMessageType("questionDone", () => {
            setQuestionsLeft(prev => prev - 1);
            setTimer(false);
            setTime(30);
            setTimeout(() => setTimer(true), 5000);
        });
    
        return () => {
            unsubscribe(); // Cleanup
        };
    }, []);
    useEffect(() => {
        if (setSize) {
            setQuestionsLeft(setSize);
        }
    }, [setSize]);
    useEffect(() => {
        if (setSize) {
            console.log(questionsLeft);
        }
    }, [questionsLeft]);
    return (
        <div className="idScreen">
            <div className="titleBar">
                <h1>Alliance</h1>
            </div>
            <p className="endMessage">Your Game Number is {unique}</p>
            {visible && <Button text={"Start Game"} variation={""} onClick={()=>{
                setVisible(!visible);
                send({
                    type: 'startGame'
                });
                setTimer(true);
            }}/>}
            {questionsLeft != 0 && timer && <div className="timer">{time}</div>}
            {questionsLeft == 0 && <Button text={"Select new set"} variation={""} onClick={()=>{
                disconnect();
                navigate('/saved');
            }}/>}
        </div>
    );
}

export default IDScreen;