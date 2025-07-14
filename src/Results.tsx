import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function Results(){
    return (
        <div>
            <div className="titleBar">
                <h1>Alliance</h1>
            </div>
            <p className="endMessage">Yay You Won!</p>
        </div>
    );
}

export default Results;