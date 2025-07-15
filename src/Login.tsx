import React, { useState } from 'react';
import logo from './logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
    const navigate = useNavigate();
    const [entry, setEntry] = useState('');
    const [size, setSize] = useState(0);
    const handleSubmit = async (code: number) => {
        const response = await fetch(`http://localhost:8000/api/size/${code}`);
        const sizeOfSet = await response.json();
        return sizeOfSet;
    };
    return(
        <div>
            <div className="titleBar">
            <h1>Alliance</h1>
        </div>
        <div className="nameEntry">
            <p>Enter ID here</p>
            <input type="text" name="username" placeholder="12345" value={entry} onChange={(e)=>{setEntry(e.target.value)}}/>
            <div className="button" onClick={async ()=>{
                const newEntry = Number(entry);
                const thisSize = await handleSubmit(newEntry);
                setSize(thisSize);
                console.log("The size of set " + newEntry + " is " + thisSize);
                if(thisSize !== 0){
                    navigate('/login', { state: {newEntry, thisSize} });
                }
                else{
                    setSize(-1);
                }
            }}>Submit</div>
            {size == -1 && <p>Put in a valid Game ID</p>}
        </div>
    </div>
    );
}

export default Login;