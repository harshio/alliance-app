// WebSocketContext.tsx
import React, { createContext, useContext } from 'react';
import useWebSocket from './useWebSocket';

const WebSocketContext = createContext<ReturnType<typeof useWebSocket> | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = useWebSocket();
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useSocket must be used within WebSocketProvider');
  return context;
};
