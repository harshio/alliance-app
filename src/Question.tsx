import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

interface LocationState{
    state: {
        currQuestion: number,
        name: string,
        pointTotal: number,
        setNumber: number,
        setSize: number;
    };
}

interface FetchedQuestion {
    text: string;
    correctAnswer: string;
    points: number;
    answers: string[];
}

const Question: React.FC = () => {
    const location = useLocation() as LocationState;
    const name = location.state?.name || 'Guest';
    const setNumber = location.state.setNumber;
    const setSize = location.state.setSize;
    const [questionIndex, setQuestionIndex] = useState(1);
    const [pointTotal, setPointTotal] = useState(0);
    const [upQuestion, setUpQuestion] = useState<FetchedQuestion | null>(null);
    const loadInQuestion = async (questionNumber: number) => {
        const thing = await fetch(`http://localhost:8000/api/question/${setNumber}/${questionNumber}`);
        const currQuestion = await thing.json();
        setUpQuestion(currQuestion);
        setQuestionIndex(questionNumber);
    }

    useEffect(() => {
        const again = location.state.currQuestion;
        const numby = location.state.pointTotal;
        console.log("This should be the same number: " + numby);
        loadInQuestion(again);
        setPointTotal(numby);
    }, []);

    const navigate = useNavigate();

    if (!upQuestion) {
        return <div>Loading question...</div>;
    }

    const currentQuestion = upQuestion as FetchedQuestion;
    const point = currentQuestion.points;
    return (
        <div>
            <div className="titleBar">
                <h1>Alliance - <p className="playerName">{name}</p></h1>
            </div>
            <div className="questionAnswer">
                <div className="question">
                    <h2 className="questionLabel">Question {questionIndex}</h2>
                    <p>{currentQuestion.text}</p>
                    <div className="image">Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi</div>
                </div>
                <div className="answers">
                    <div className="answer1">
                        <div className="button inline" onClick={(e)=>{
                                const selectedText = e.currentTarget.textContent;
                                const amountLeft = setSize - questionIndex;
                                let ohBoy = false;
                                if(selectedText === currentQuestion.correctAnswer){
                                    ohBoy = true;
                                }
                                navigate('/between', {state: {questionIndex, name, ohBoy, amountLeft, pointTotal, point, setNumber, setSize}});
                            }}>{currentQuestion.answers[0]}</div>
                        <div className="button inline" onClick={(e)=>{
                                const selectedText = e.currentTarget.textContent;
                                const amountLeft = setSize - questionIndex;
                                let ohBoy = false;
                                if(selectedText === currentQuestion.correctAnswer){
                                    ohBoy = true;
                                }
                                navigate('/between', {state: {questionIndex, name, ohBoy, amountLeft, pointTotal, point, setNumber, setSize}});
                            }}>{currentQuestion.answers[1]}</div>
                    </div>
                    <div className="answer2">
                        <div className="button inline" onClick={(e)=>{
                                const selectedText = e.currentTarget.textContent;
                                const amountLeft = setSize - questionIndex;
                                let ohBoy = false;
                                if(selectedText === currentQuestion.correctAnswer){
                                    ohBoy = true;
                                }
                                navigate('/between', {state: {questionIndex, name, ohBoy, amountLeft, pointTotal, point, setNumber, setSize}});
                            }}>{currentQuestion.answers[2]}</div>
                        <div className="button inline" onClick={(e)=>{
                                const selectedText = e.currentTarget.textContent;
                                const amountLeft = setSize - questionIndex;
                                let ohBoy = false;
                                if(selectedText === currentQuestion.correctAnswer){
                                    ohBoy = true;
                                }
                                navigate('/between', {state: {questionIndex, name, ohBoy, amountLeft, pointTotal, point, setNumber, setSize}});
                            }}>{currentQuestion.answers[3]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;