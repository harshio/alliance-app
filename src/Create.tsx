import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Button from './Button';

function Create() {
    const[question, setQuestion] = useState('');
    const[pointValue, setPointValue] = useState('');
    const[allDone, setAllDone] = useState(false);
    const [answerArray, setAnswerArray] = useState<string[]>([]);
    const [numberArray, setNumberArray] = useState<number[]>([]);
    const [clickedArray, setClickedArray] = useState<boolean[]>(new Array(7).fill(false));
    const[beginning, setBeginning] = useState(false);
    const[questionNumber, setQuestionNumber] = useState(1);
    const[name, setName] = useState('');
    const[hideAdd, setHideAdd] = useState(false);
    const[currentNumber, setCurrentNumber] = useState(0);
    const navigate = useNavigate();
    const [imageURL, setImageURL] = useState("");
    const [realURL, setRealURL] = useState("");
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get first file
        if (file) {
          setImageURL(URL.createObjectURL(file));
          const form = new FormData();
          const key = `uploads/${file.name}`;
          form.append("file", file);
          form.append("key", key)

          const res = await fetch("http://localhost:8000/upload", {
            method: "POST",
            body: form,
          });
          const data = await res.json();
          console.log(data);
          setRealURL(`https://bucketharshio0651.s3.amazonaws.com/${key}`);
        }
    };

    useEffect(() => {
        console.log(numberArray);
        if(numberArray[numberArray.length-1] == 6){
            setHideAdd(true);
        }
    }, [numberArray]);

    const handleConfirm = async () => {
        const response = await fetch("http://localhost:8000/api/max");
        const maxSetNumber = await response.json();
        const newSetNumber = maxSetNumber + 1;
        setCurrentNumber(newSetNumber);
        console.log("Current Set Number:", newSetNumber);
    }

    const isNumberString = (str: string) => {
        return str.trim() !== "" && !isNaN(Number(str));
    }

    const handleSend = async (text: string, correctAnswer: string[], points: number, answers: string[], setNumber: number, questionNumber: number, imageURL: string) => {
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
                questionNumber: questionNumber,
                imageURL: imageURL
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
                    {!hideAdd && !allDone && <Button text={'Add option'} variation={''} onClick={()=>{
                        console.log("Hello");
                        if(numberArray.length === 0){
                            setNumberArray(prev => [...prev, 4])
                        }
                        else{
                            setNumberArray(prev => [...prev, prev[prev.length-1]+1])
                        }
                }}/>}
                </div>
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
                <input type="file" className="rebellious" accept="image/*" onChange={handleImageChange} />
      
                {imageURL && (
                    <img
                    src={imageURL}
                    alt="User selected"
                    style={{ width: "200px", height: "200px", marginTop: "10px"}}
                    />
                )}
                {
                    numberArray.map(i =>
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
                    )
                }
            </div>}
            {beginning && !allDone && <Button text={'Pick answers to be correct'} variation={''} onClick={()=>{
                //gonna put a bunch of checks here
                if(isNumberString(pointValue) && question != "" && imageURL != ""){
                    setAllDone(true);
                }
            }}/>}
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
                handleSend(currQuestion, correctAnswer, currPoints, answers, setIndex, currIndex, realURL);
                setQuestion('');
                setPointValue('');
                setAnswerArray([]);
                setNumberArray([]);
                setImageURL("");
                setRealURL("");
                setClickedArray(new Array(7).fill(false));
                setAllDone(false);
                setQuestionNumber(questionNumber + 1);
            }} />}
        </div>
    );
}

export default Create;