import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function IDScreen(){
    const location = useLocation() as {state: {tag: number}};
    const unique = location.state.tag;
    return (
        <div>
            <div className="titleBar">
                <h1>Alliance</h1>
            </div>
            <p className="endMessage">Your Game ID is {unique}</p>
        </div>
    );
}

export default IDScreen;