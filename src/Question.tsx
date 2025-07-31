import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from './WebSocketContext';
import './App.css';
import Button from './Button';
import SpecialButton from './SpecialButton';

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
    const [clicked, setClicked] = useState(false);
    const [pointTotal, setPointTotal] = useState(0);
    const {connect, disconnect, send, latestMessage, subscribeToMessageType} = useSocket();
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

    useEffect(() => {
        if (upQuestion) {
            subscribeToMessageType("questionDone", () => {
                navigate('/between', {
                  state: { questionIndex, name, ohBoy, amountLeft, pointTotal, point, setNumber, setSize }
                });
            });
        }
    }, [upQuestion]);

    const navigate = useNavigate();

    if (!upQuestion) {
        return <div>Loading question...</div>;
    }

    const currentQuestion = upQuestion as FetchedQuestion;
    const point = currentQuestion.points;
    const amountLeft = setSize - questionIndex;
    let ohBoy = false;
    return (
        <div className="fuck">
            <div className="titleBar">
                <h1>Alliance - <p className="playerName">{name}</p></h1>
            </div>
            <div className="godIsGood">
                <div className="questionAnswer">
                    <div className="question">
                        <h2 className="questionLabel">Question {questionIndex}</h2>
                        <p>{currentQuestion.text}</p>
                        <div className="image">Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi</div>
                    </div>
                    {!clicked && <div className="answers">
                        <div className="answer1">
                            <SpecialButton text={currentQuestion.answers[0]} variation={'inline'} onClick={(e)=>{
                                    const selectedText = e.currentTarget.textContent;
                                    if(selectedText === currentQuestion.correctAnswer){
                                        ohBoy = true;
                                    }
                                    send({
                                        type: 'playerDone'
                                    });
                                    setClicked(true);
                            }}/>
                            <SpecialButton text={currentQuestion.answers[1]} variation={'inline'} onClick={(e)=>{
                                    const selectedText = e.currentTarget.textContent;
                                    if(selectedText === currentQuestion.correctAnswer){
                                        ohBoy = true;
                                    }
                                    send({
                                        type: 'playerDone'
                                    });
                                    setClicked(true);
                            }}/>
                        </div>
                        <div className="answer2">
                            <SpecialButton text={currentQuestion.answers[2]} variation={'inline'} onClick={(e)=>{
                                    const selectedText = e.currentTarget.textContent;
                                    if(selectedText === currentQuestion.correctAnswer){
                                        ohBoy = true;
                                    }
                                    send({
                                        type: 'playerDone'
                                    });
                                    setClicked(true);
                            }}/>
                            <SpecialButton text={currentQuestion.answers[3]} variation={'inline'} onClick={(e)=>{
                                    const selectedText = e.currentTarget.textContent;
                                    if(selectedText === currentQuestion.correctAnswer){
                                        ohBoy = true;
                                    }
                                    send({
                                        type: 'playerDone'
                                    });
                                    setClicked(true);
                            }}/>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Question;