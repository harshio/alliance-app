import React, { useState } from 'react';
import logo from './logo.svg';
import finalLogo from './Frame7.svg';
import background from './background.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Button from './Button';

function Login() {
    const navigate = useNavigate();
    const [entry, setEntry] = useState('');
    return(
        <div>
            <div className="titleBar">
                <i className="bi bi-list"></i>
                <h1>Alliance</h1>
                <img className="wonky" src={finalLogo}/>
            </div>
            <div className="background-container">
                <img className="background" src={background} />
                <div className="overlay" />
                <div className="nameEntry">
                    <p>Enter ID here</p>
                    <input type="text" name="username" placeholder="12345" value={entry} onChange={(e)=>{setEntry(e.target.value)}}/>
                    <Button text={'Submit'} variation={''} onClick={async ()=>{
                            navigate('/login', {state: {entry}});
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default Login;