import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Button from './Button';

function Results(){
    const navigate = useNavigate();
    const location = useLocation() as {state: {name: string, pointTotal: number}};
    const name = location.state.name;
    const score = location.state.pointTotal;
    //before the navigate in the onClick, the player client will disconnect from the server
    return (
        <div>
            <div className="titleBar">
                <h1>Alliance</h1>
            </div>
            <p className="endMessage">Great job, {name}! You scored {score} points!</p>
            <Button text={"Play Again"} variation={''} onClick={()=>{navigate('/')}}/>
        </div>
    );
}

export default Results;