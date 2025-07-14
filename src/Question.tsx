import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

interface LocationState{
    state: {
        currQuestion: number,
        name: string,
        pointTotal: number;
    };
}

const Question: React.FC = () => {
    const location = useLocation() as LocationState;
    const name = location.state?.name || 'Guest';
    const [questionIndex, setQuestionIndex] = useState(0);
    const [pointTotal, setPointTotal] = useState(0);

    useEffect(() => {
        const again = location.state.currQuestion;
        const numby = location.state.pointTotal;
        console.log("This should be the same number: " + numby);
        setQuestionIndex(again);
        setPointTotal(numby);
    }, []);

    const questions = [
        {
            text: "Is this a fruit or a vegetable?",
            answers: ["Fruit", "Vegetable", "Fruit", "Vegetable"],
            correctAnswer: "Vegetable",
            points: 10
        },
        {
            text: "Is this man happy or sad?",
            answers: ["Happy", "Sad", "Happy", "Sad"],
            correctAnswer: "Happy",
            points: 9
        },
        {
            text: "How much should you get paid for your work, given that you live in a shitty apartment?",
            answers: ["A Little", "A Lot", "A Little", "A Lot"],
            correctAnswer: "A Lot",
            points: 8
        },
        {
            text: "Is this a bottom or a top?",
            answers: ["Bottom", "Top", "Bottom", "Top"],
            correctAnswer: "Top",
            points: 7
        },
        {
            text: "Is this a couch or a chair?",
            answers: ["Couch", "Chair", "Couch", "Chair"],
            correctAnswer: "Couch",
            points: 6
        }
    ];
    const currentQuestion = questions[questionIndex];
    const point = currentQuestion.points;
    const navigate = useNavigate();
    return(
        <div>
            <div className="titleBar">
                <h1>Alliance - <p className="playerName">{name}</p></h1>
            </div>
            <div className="questionAnswer">
                <div className="question">
                    <h2 className="questionLabel">Question {questionIndex + 1}</h2>
                    <p>{currentQuestion.text}</p>
                    <div className="image">Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi Hi</div>
                </div>
                <div className="answers">
                    <div className="answer1">
                        <div className="button inline" onClick={(e)=>{
                                const selectedText = e.currentTarget.textContent;
                                const amountLeft = questions.length - questionIndex;
                                let ohBoy = false;
                                if(selectedText === currentQuestion.correctAnswer){
                                    ohBoy = true;
                                }
                                navigate('/between', {state: {questionIndex, name, ohBoy, amountLeft, pointTotal, point}});
                            }}>{currentQuestion.answers[0]}</div>
                        <div className="button inline" onClick={(e)=>{
                                const selectedText = e.currentTarget.textContent;
                                const amountLeft = questions.length - questionIndex;
                                let ohBoy = false;
                                if(selectedText === currentQuestion.correctAnswer){
                                    ohBoy = true;
                                }
                                navigate('/between', {state: {questionIndex, name, ohBoy, amountLeft, pointTotal, point}});
                            }}>{currentQuestion.answers[1]}</div>
                    </div>
                    <div className="answer2">
                        <div className="button inline" onClick={(e)=>{
                                const selectedText = e.currentTarget.textContent;
                                const amountLeft = questions.length - questionIndex;
                                let ohBoy = false;
                                if(selectedText === currentQuestion.correctAnswer){
                                    ohBoy = true;
                                }
                                navigate('/between', {state: {questionIndex, name, ohBoy, amountLeft, pointTotal, point}});
                            }}>{currentQuestion.answers[2]}</div>
                        <div className="button inline" onClick={(e)=>{
                                const selectedText = e.currentTarget.textContent;
                                const amountLeft = questions.length - questionIndex;
                                let ohBoy = false;
                                if(selectedText === currentQuestion.correctAnswer){
                                    ohBoy = true;
                                }
                                navigate('/between', {state: {questionIndex, name, ohBoy, amountLeft, pointTotal, point}});
                            }}>{currentQuestion.answers[3]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;