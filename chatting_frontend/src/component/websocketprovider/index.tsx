import React, { createContext, useContext, useState, useEffect, ReactNode} from 'react';

interface WebSocketContextProps {
  ws: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextProps>({ ws: null });

export const useWebSocket = () => {
  const { ws } = useContext(WebSocketContext);
  return { ws }; // 确保这里返回的是包含 ws 对象的对象，而不是只返回 ws 对象本身
};
interface WebSocketProviderProps {
    children: ReactNode;
  }

export const WebSocketProvider: React.FC<WebSocketProviderProps>= ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newWs = new WebSocket('ws://localhost:3001');

    newWs.addEventListener('open', () => {
      console.log('WebSocket connected');
      setWs(newWs);
    });

    newWs.addEventListener('close', (event) => {
      console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`);
      setWs(null);
    });

    newWs.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      setTimeout(() => {
        newWs.close();
      }, 1000);
      
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws }}>
      {children}
    </WebSocketContext.Provider>
  );
};
