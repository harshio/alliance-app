import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { useSocket } from './WebSocketContext';
import Button from './Button';

function Saved(){
    const[saved, setSaved] = useState<number[]>([]);
    const navigate = useNavigate();
    const[clicked, setClicked] = useState(-1);
    const {connect, disconnect, send, latestMessage, hostConnect} = useSocket();
    const loadInSets = async () => {
        const response = await fetch("http://localhost:8000/api/setNumbers");
        const data = await response.json();
        setSaved(data);
    }
    const deleteSet = async (setNumber: number) => {
        const response = await fetch(`http://localhost:8000/api/old/${setNumber}`, {
            method: 'DELETE'
        });
    }
    useEffect(()=>{
        loadInSets();
    }, []);
    useEffect(()=>{
        if (clicked !== -1) {
            (async () => {
                await deleteSet(clicked);
                await loadInSets();
                setClicked(-1); // optional: reset clicked to avoid re-triggering
            })();
        }
    }, [clicked]);
    return(
        <div>
            <div className="titleBar">
                <h1>Alliance - <p className="playerName">Saved Sets</p></h1>
            </div>
            {saved.map((num) =>(
                <div className="centeringElements">
                    <Button text={`SetNumber: ${num}`} variation={''} onClick={async ()=>{
                        const setIndex = num;
                        //host client will connect to server here (will only disconnect upon closing out of the tab, which automatically happens in Google Chrome)
                        const connected = await hostConnect('host');
                        if(connected){
                            console.log("FUCK");
                            send({
                                type: 'sessionID',
                                content: setIndex
                            })
                        }
                        navigate('/id', {state: {setIndex}});
                    }}/>
                    <div className="deletion" onClick={()=>{setClicked(num)}}>x</div>
                </div>
            ))}
        </div>
    );
}

export default Saved;