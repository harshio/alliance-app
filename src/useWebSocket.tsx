import { useRef } from 'react';

type ServerMessage = {
    from: string;
    content: string;
    type: string;
}

type ClientMessage = {
    to: string;
    content: string | null;
    type: string;
}

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
    const messagesRef = useRef<ServerMessage[]>([]);
    const numberRef = useRef(0);

    //running the connect method connects our client, indicated by
    //the websocket, to the server, and sets the current property of our
    //useRef for a websocket to aforementioned client websocket
    const getSize = () => {
        return numberRef.current;
    }
    const connect = (clientId: string) => {
        if (wsRef.current) return;
        const ws = new WebSocket(`ws://localhost:8000/ws?client_id=${clientId}`);

        ws.onopen = () => {
            console.log(`Connected to the server, ${clientId} is`);
        };
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if(message["from"] !== "server"){
                console.log(message["from"]);
                messagesRef.current.push(message);
            }
            else{
                const num = Number(message["content"]);
                console.log(num);
                numberRef.current = num;
            }
        };
        ws.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
        ws.onclose = () => {
            console.log('Disconnected from server');
        };
        //here we're setting our useRef's 'current' property to the 
        //client that just connected to the server,
        //indicated by the websocket. this will stay
        //true even as we reload or navigate pages or whatever
        wsRef.current = ws;
    };

    const disconnect = () => {
        if (wsRef.current) {
            wsRef.current.close(); //closes websocket connection
            wsRef.current = null; //since the client is no longer connected to the server, the useRef's current client should be null
        }
    };

    const send = (message: ClientMessage) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN){
            wsRef.current.send(JSON.stringify(message));
        }
    };

    const getMessageCount = () => {
        return messagesRef.current.length;
    };
    
    const clearMessages = () => {
        messagesRef.current = [];
    }

    return {connect, disconnect, send, getMessageCount, clearMessages, getSize};

}

export default useWebSocket;