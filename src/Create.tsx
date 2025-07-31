import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Button from './Button';

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
    const[beginning, setBeginning] = useState(false);
    const[questionNumber, setQuestionNumber] = useState(1);
    const[name, setName] = useState('');
    const[currentNumber, setCurrentNumber] = useState(0);
    const navigate = useNavigate();

    const handleConfirm = async () => {
        const response = await fetch("http://localhost:8000/api/max");
        const maxSetNumber = await response.json();
        const newSetNumber = maxSetNumber + 1;
        setCurrentNumber(newSetNumber);
        console.log("Current Set Number:", newSetNumber);
    }

    const handleSend = async (text: string, correctAnswer: string, points: number, answers: string[], setNumber: number, questionNumber: number) => {
        const response = await fetch("http://localhost:8000/api/new",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                correctAnswer: correctAnswer,
                points: points,
                answers: answers,
                setNumber: setNumber,
                questionNumber: questionNumber
            })
        });
    }

    return(
        <div>
            <div className="titleBar">
                <h1>Alliance - {beginning && <p className="playerName">{name}</p>}</h1>
            </div>
            {!beginning && <div className="nameEntry">
                <p>Enter name of set: </p>
                <input type="text" placeholder="Abraham Lincoln" value={name} onChange={(e) => setName(e.target.value)}/>
                <Button text={'Confirm'} variation={''} onClick={()=>{
                    handleConfirm();
                    setBeginning(true);
                }}/>
            </div>}
            {beginning && <div className="questionBox">
                <div className="format">
                    <p>Question: </p>
                    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}/>
                </div>
                <div className="format">
                    <p>Point Value: </p>
                    <input type="text" value={pointValue} onChange={(e) => setPointValue(e.target.value)}/>
                </div>
                <div className="format">
                    {allDone && <Button text={nameOne} variation={clickOne ? 'clicked': ''} onClick={() => {
                        if(clickOne){
                            setClickOne(false);
                        }
                        else{
                            setClickOne(true);
                        }
                    }}/>}
                    {!allDone && <p>First Answer: </p>}
                    {!allDone && <input type="text" value={nameOne} onChange={(e) => setNameOne(e.target.value)}/>}
                </div>
                <div className="format">
                    {allDone && <Button text={nameTwo} variation={clickTwo ? 'clicked': ''} onClick={() => {
                        if(clickTwo){
                            setClickTwo(false);
                        }
                        else{
                            setClickTwo(true);
                        }
                    }}/>}
                    {!allDone && <p>Second Answer: </p>}
                    {!allDone && <input type="text" value={nameTwo} onChange={(e) => setNameTwo(e.target.value)}/>}
                </div>
                <div className="format">
                    {allDone && <Button text={nameThree} variation={clickThree ? 'clicked': ''} onClick={() => {
                        if(clickThree){
                            setClickThree(false);
                        }
                        else{
                            setClickThree(true);
                        }
                    }}/>}
                    {!allDone && <p>Third Answer: </p>}
                    {!allDone && <input type="text" value={nameThree} onChange={(e) => setNameThree(e.target.value)}/>}
                </div>
                <div className="format">
                    {allDone && <Button text={nameFour} variation={clickFour ? 'clicked': ''} onClick={() => {
                        if(clickFour){
                            setClickFour(false);
                        }
                        else{
                            setClickFour(true);
                        }
                    }}/>}
                    {!allDone && <p>Fourth Answer: </p>}
                    {!allDone && <input type="text" value={nameFour} onChange={(e) => setNameFour(e.target.value)}/>}
                </div>
            </div>}
            {beginning && !allDone && <Button text={'+'} variation={''} onClick={()=>{setAllDone(true)}}/>}
            {beginning && !allDone && <Button text={'Complete Game'} variation={''} onClick={() => {
	                const setIndex = currentNumber;
	                navigate('/saved');
            }}/>}
            {beginning && allDone && <Button text={'Confirm'} variation={''} onClick={()=>{
                let correctAnswer = "";
                if(clickOne){
                    correctAnswer = nameOne;
                }
                else if(clickTwo){
                    correctAnswer = nameTwo;
                }
                else if(clickThree){
                    correctAnswer = nameThree;
                }
                else if(clickFour){
                    correctAnswer = nameFour;
                }
                const answers = [nameOne, nameTwo, nameThree, nameFour];
                const currIndex = questionNumber;
                const currQuestion = question;
                const currPoints = Number(pointValue);
                const setIndex = currentNumber;
                handleSend(currQuestion, correctAnswer, currPoints, answers, setIndex, currIndex);
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
                setQuestionNumber(questionNumber + 1);
            }} />}
        </div>
    );
}

export default Create;