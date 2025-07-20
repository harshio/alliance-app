import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

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
            <div className="button" onClick = {()=>{navigate('/')}}>Play Again</div>
        </div>
    );
}

export default Results;