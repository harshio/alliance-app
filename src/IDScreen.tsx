import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function IDScreen(){
    const location = useLocation() as {state: {setIndex: number}};
    const unique = location.state.setIndex;
    return (
        <div>
            <div className="titleBar">
                <h1>Alliance</h1>
            </div>
            <p className="endMessage">Your Game Number is {unique}</p>
        </div>
    );
}

export default IDScreen;