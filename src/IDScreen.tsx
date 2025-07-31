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
    const {connect, disconnect, send, latestMessage} = useSocket();
    return (
        <div>
            <div className="titleBar">
                <h1>Alliance</h1>
            </div>
            <p className="endMessage">Your Game Number is {unique}</p>
            {visible && <Button text={"Start Game"} variation={""} onClick={()=>{
                setVisible(!visible);
                send({
                    type: 'startGame'
                });
            }}/>}
        </div>
    );
}

export default IDScreen;