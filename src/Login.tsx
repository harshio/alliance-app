import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
    const navigate = useNavigate();
    return(
        <div>
            <div className="titleBar">
            <h1>Alliance</h1>
        </div>
        <div className="nameEntry">
            <p>Write ID here</p>
            <input type="text" name="username" placeholder="123456"/>
            <div className="button" onClick={()=>navigate('/')}>Submit</div>
        </div>
    </div>
    );
}

export default Login;