import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function Saved(){
    const[saved, setSaved] = useState<number[]>([]);
    const navigate = useNavigate();
    const loadInSets = async () => {
        const response = await fetch("http://localhost:8000/api/setNumbers");
        const data = await response.json();
        setSaved(data);
    }
    useEffect(()=>{
        loadInSets();
    }, []);
    return(
        <div>
            <div className="titleBar">
                <h1>Alliance - <p className="playerName">Saved Sets</p></h1>
            </div>
            {saved.map((num) =>(
                <div className="button" onClick={()=>{
                    const setIndex = num;
                    navigate('/id', {state: {setIndex}});
                }}>
                    SetNumber: {num}
                </div>
            ))}
        </div>
    );
}

export default Saved;