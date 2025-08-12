import { useRef, useState } from 'react';

type playerNames = {
    type: string;
    content: string[];
}

type ClientMessage = {
    to: string;
    content: string | null;
    type: string;
}

type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];


function useWebSocket() {
    //useRef is a React Hook that gives you a mutable container object
    //whose .current property persists across renders -- without causing 
    //a re-render when it changes
    //a box you can put stuff in, and React won't react whatsoever if
    //the contents change
    //here, we're creating a container to store a WebSocket
    //connection that survives re-renders, doesn't trigger
    //re-renders when it changes, and lets you access and manipulate
    //the WebSocket object whenever needed
    const wsRef = useRef<WebSocket | null>(null);
    //We will create a global useState that's also rooted at index.tsx, the root or whatever
    const [latestMessage, setLatestMessage] = useState<playerNames | null>(null);
    const [setSize, setSetSize] = useState(0);
    const [activeSet, setActiveSet] = useState(0);

    //running the connect method connects our client, indicated by
    //the websocket, to the server, and sets the current property of our
    //useRef for a websocket to aforementioned client websocket

    //for some reason, causing latestMessage to change makes a 404 Error

    const listeners = useRef<{ [key: string]: ((content: any) => void)[] }>({});

    const subscribeToMessageType = (type: string, callback: (content: any) => void) => {
        if (!listeners.current[type]) {
            listeners.current[type] = [];
        }
        listeners.current[type].push(callback);
        return () => {
            listeners.current[type] = listeners.current[type].filter(cb => cb !== callback);
        };
    };

    const hostConnect = (clientId: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            if (wsRef.current) return resolve(true);
    
            const ws = new WebSocket(`ws://localhost:8000/ws?client_id=${clientId}`);
            ws.onopen = () => {
                console.log(`Connected to the server as ${clientId}`);
                wsRef.current = ws;
                resolve(true);
            };
            ws.onerror = (err) => {
                console.error('WebSocket error:', err);
                reject(false);
            };
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log("HELLO! JESUS?!");
                const { type, content } = message;
                if(message["type"] == "setSize"){
                    setSetSize(message["content"]);
                }
                listeners.current[type]?.forEach(cb => cb(content));
            };
            ws.onclose = () => {
                console.log('Disconnected from server');
            };
        });
    }

    const connect = (clientId: string, setNumber: number, onStartGame?: () => void): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            if (wsRef.current) return resolve(true);
    
            const ws = new WebSocket(`ws://localhost:8000/ws?client_id=${clientId}&setNumber=${setNumber}`);
            ws.onopen = () => {
                console.log(`Connected to the server as ${clientId}`);
                wsRef.current = ws;
                resolve(true);
            };
            ws.onerror = (err) => {
                console.error('WebSocket error:', err);
                reject(false);
            };
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                const { type, content } = message;
                if(message["type"] == "playerNames"){
                    setLatestMessage(message);
                }
                if(message["type"] == "activeSet"){
                    console.log("You are being given the set: ");
                    console.log(message["content"]);
                    setActiveSet(content);
                }
                if(message["type"] == "startGame"){
                    setActiveSet(-1);
                }
                listeners.current[type]?.forEach(cb => cb(content));
            };
            ws.onclose = () => {
                console.log('Disconnected from server');
            };
        });
    };
    

    const disconnect = () => {
        if (wsRef.current) {
            wsRef.current.close(); //closes websocket connection
            wsRef.current = null; //since the client is no longer connected to the server, the useRef's current client should be null
        }
    };

    const send = (message: JSONValue) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN){
            wsRef.current.send(JSON.stringify(message));
        }
    };

    return {connect, disconnect, send, latestMessage, hostConnect, subscribeToMessageType, setSize, activeSet};

}

export default useWebSocket;