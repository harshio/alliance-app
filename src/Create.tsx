import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Button from './Button';

function Create() {
    //This is the worst thing I have ever bore witness to
    const[question, setQuestion] = useState('');
    const[pointValue, setPointValue] = useState('');
    const[allDone, setAllDone] = useState(false);
    const [answerArray, setAnswerArray] = useState<string[]>([]);
    const [clickedArray, setClickedArray] = useState<boolean[]>(new Array(7).fill(false));
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

    const handleSend = async (text: string, correctAnswer: string[], points: number, answers: string[], setNumber: number, questionNumber: number) => {
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
                {[0,1,2,3].map(i => 
                    <div className="format" key={i}>
                        {allDone && <Button text={answerArray[i]} variation={clickedArray[i] ? 'clicked': ''} onClick={() => {
                            setClickedArray(prev => {
                                const copy = [...prev];
                                copy[i] = !copy[i];
                                return copy;
                            });
                        }}/>}
                        {!allDone && <p>Answer: </p>}
                        {!allDone && <input type="text" className="needSpace" value={answerArray[i]} onChange={(e) => setAnswerArray(prev => {
                            const copy = [...prev];
                            copy[i] = e.target.value;
                            return copy;
                        })}/>}
                    </div>
                )}
            </div>}
            {beginning && !allDone && <Button text={'+'} variation={''} onClick={()=>{setAllDone(true)}}/>}
            {beginning && !allDone && <Button text={'Complete Game'} variation={''} onClick={() => {
	                const setIndex = currentNumber;
	                navigate('/saved');
            }}/>}
            {beginning && allDone && <Button text={'Confirm'} variation={''} onClick={()=>{
                let correctAnswer: string[] = [];
                for(let i = 0; i < clickedArray.length; i++){
                    if(clickedArray[i] == true){
                        correctAnswer.push(answerArray[i]);
                    }
                }
                const answers = answerArray;
                const currIndex = questionNumber;
                const currQuestion = question;
                const currPoints = Number(pointValue);
                const setIndex = currentNumber;
                handleSend(currQuestion, correctAnswer, currPoints, answers, setIndex, currIndex);
                setQuestion('');
                setPointValue('');
                setAnswerArray([]);
                setClickedArray(new Array(clickedArray.length).fill(false));
                setAllDone(false);
                setQuestionNumber(questionNumber + 1);
            }} />}
        </div>
    );
}

export default Create;