import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function Between() {
    const location = useLocation() as {state: {questionIndex: number, name: string, ohBoy: boolean, amountLeft: number, pointTotal: number, point: number, setNumber: number, setSize: number}};
    const currQuestion = location.state.questionIndex + 1;
    const name = location.state.name;
    const yeahOkay = location.state.ohBoy;
    const remaining = location.state.amountLeft;
    let pointTotal = location.state.pointTotal;
    const worth = location.state.point;
    const setNumber = location.state.setNumber;
    const setSize = location.state.setSize;
    const navigate = useNavigate();
    if(yeahOkay){
        pointTotal = pointTotal + worth;
        console.log(pointTotal);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(remaining === 0){
                navigate('/results', {state: {name, pointTotal}});
            }
            else{
                navigate('/questions', {state: {currQuestion, name, pointTotal, setNumber, setSize}});
            }
        }, 5000);
    
        // Optional cleanup if component unmounts before timeout fires
        return () => clearTimeout(timeout);
      }, []);

    return(
        <div>
            <div className="titleBar">
                <h1>Alliance - <p className="playerName">{name}</p></h1>
            </div>
            {yeahOkay && <p className="endMessage">Correct! You earn {worth} points</p>}
            {!yeahOkay && <p className="endMessage">Wrong! You earn 0 points</p>}
        </div>
    );
}

export default Between;