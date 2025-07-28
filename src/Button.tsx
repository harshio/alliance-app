import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {useNavigate, useLocation} from 'react-router-dom';
import { useSocket } from './WebSocketContext';

//don't wanna think too hard about this rn, but I
//imagine this is a good skeletal design

interface Props {
    text: string; //there's always text on a button
    variation: string; //there's usually some sort of conditional JSX modifying the class of the button
}

function Button(props: Props){
    return(
        <div className={`button ${props.variation}`}>{props.text}</div>
    );
}

export default Button;