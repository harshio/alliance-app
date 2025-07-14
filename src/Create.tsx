import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function Create() {
    const[nameOne, setNameOne] = useState('');
    const[nameTwo, setNameTwo] = useState('');
    const[nameThree, setNameThree] = useState('');
    const[nameFour, setNameFour] = useState('');
    const[question, setQuestion] = useState('');
    const[pointValue, setPointValue] = useState('');
    const[allDone, setAllDone] = useState(false);
    const [clickOne, setClickOne] = useState(false);
    const [clickTwo, setClickTwo] = useState(false);
    const [clickThree, setClickThree] = useState(false);
    const [clickFour, setClickFour] = useState(false);
    return(
        <div>
            <div className="titleBar">
                <h1>Alliance</h1>
            </div>
            <div className="questionBox">
                <div className="format">
                    <p>Question: </p>
                    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}/>
                </div>
                <div className="format">
                    <p>Point Value: </p>
                    <input type="text" value={pointValue} onChange={(e) => setPointValue(e.target.value)}/>
                </div>
                <div className="format">
                    {allDone && <div className={`button ${clickOne ? 'clicked' : ''}`}
                    onClick={() => {
                        if(clickOne){
                            setClickOne(false);
                        }
                        else{
                            setClickOne(true);
                        }
                    }}>{nameOne}</div>}
                    {!allDone && <p>First Answer: </p>}
                    {!allDone && <input type="text" value={nameOne} onChange={(e) => setNameOne(e.target.value)}/>}
                </div>
                <div className="format">
                    {allDone && <div className={`button ${clickTwo ? 'clicked' : ''}`}
                    onClick={() => {
                        if(clickTwo){
                            setClickTwo(false);
                        }
                        else{
                            setClickTwo(true);
                        }
                    }}>{nameTwo}</div>}
                    {!allDone && <p>Second Answer: </p>}
                    {!allDone && <input type="text" value={nameTwo} onChange={(e) => setNameTwo(e.target.value)}/>}
                </div>
                <div className="format">
                    {allDone && <div className={`button ${clickThree ? 'clicked' : ''}`}
                    onClick={() => {
                        if(clickThree){
                            setClickThree(false);
                        }
                        else{
                            setClickThree(true);
                        }
                    }}>{nameThree}</div>}
                    {!allDone && <p>Third Answer: </p>}
                    {!allDone && <input type="text" value={nameThree} onChange={(e) => setNameThree(e.target.value)}/>}
                </div>
                <div className="format">
                    {allDone && <div className={`button ${clickFour ? 'clicked' : ''}`}
                    onClick={() => {
                        if(clickFour){
                            setClickFour(false);
                        }
                        else{
                            setClickFour(true);
                        }
                    }}>{nameFour}</div>}
                    {!allDone && <p>Fourth Answer: </p>}
                    {!allDone && <input type="text" value={nameFour} onChange={(e) => setNameFour(e.target.value)}/>}
                </div>
            </div>
            {!allDone && <div className="button" onClick= {()=>{setAllDone(true)}}>
                +
            </div>}
            {allDone && <div className="button" onClick= {()=>{
                setNameOne('');
                setNameTwo('');
                setNameThree('');
                setNameFour('');
                setQuestion('');
                setPointValue('');
                setClickOne(false);
                setClickTwo(false);
                setClickThree(false);
                setClickFour(false);
                setAllDone(false);
            }}>
                Confirm
            </div>}
        </div>
    );
}

export default Create;