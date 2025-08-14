import React, { useState } from 'react';
import logo from './logo.svg';
import finalLogo from './Frame7.svg';
import background from './background.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Button from './Button';
import { Navbar, Nav, Container } from 'react-bootstrap'

function Login() {
    const navigate = useNavigate();
    const [entry, setEntry] = useState('');
    return(
        <div className="Login">
            <div className="titleBar">
                <h1>Alliance</h1>
                <img className="wonky" src={finalLogo}/>
            </div>
            <div className="blackLinks">
                <p className="blackLink" onClick={()=>{navigate('/saved')}}>Your Sets</p>
                <p className="blackLink" onClick={()=>{navigate('/create')}}>Create A Set</p>
            </div>
            <div className="background-container">
                <img className="background" src={background} />
                <div className="overlay" />
                <div className="nameEntry">
                    <p>Enter ID here</p>
                    <input type="text" name="username" placeholder="12345" value={entry} onChange={(e)=>{setEntry(e.target.value)}}/>
                    <Button text={'Submit'} onClick={async ()=>{
                            navigate('/login', {state: {entry}});
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default Login;