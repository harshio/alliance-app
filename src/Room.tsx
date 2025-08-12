import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {useNavigate, useLocation} from 'react-router-dom';
import { useSocket } from './WebSocketContext';
interface LocationState{
    state:{
        currQuestion: number,
        name: string,
        pointTotal: number,
        setNumber: number,
        setSize: number;
    };
}

function Room() {
    const {connect, disconnect, send, latestMessage, subscribeToMessageType} = useSocket();
    const[players, setPlayers] = useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation() as LocationState;
    const currQuestion = location.state.currQuestion;
    const name = location.state.name;
    const pointTotal = location.state.pointTotal;
    const setNumber = location.state.setNumber;
    const setSize = location.state.setSize;
    useEffect(() => {
        if (latestMessage) {
            const list: string[] = latestMessage["content"]
            setPlayers(list);
        }
    }, [latestMessage]);
    useEffect(() => {
        subscribeToMessageType("startGame", async () => {
            navigate('/questions', {
                state: { currQuestion, name, pointTotal, setNumber, setSize}
            });
        });
    }, []);
    return(
        <div className="prettyRoom">
            <div className="titleBar">
                <h1>Alliance - <p className="playerName">Room</p></h1>
            </div>
            <div className="playerList">
                {
                    players.map((name) =>
                        <p>{name}</p>
                    )
                }
            </div>
        </div>
    );
}

export default Room;