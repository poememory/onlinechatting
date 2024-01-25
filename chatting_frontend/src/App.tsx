import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { WebSocketProvider } from './component/websocketprovider';
import Register from './component/register'
import Main from './component/mainpage/idnex';
import Login from './component/login';
import './App.css'

interface MyContextValue {
  username: string;
  loginOrNot:boolean;
  setusername: (newValue: string) => void;
  setLoginOrNot:(newValue:boolean)=>void;
}
const MyContext = createContext<MyContextValue | undefined>(undefined);

// 创建一个 Context Provider，负责提供 Context 的值
interface MyContextProviderProps {
  children: ReactNode;
}

 const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [username, setusername] = useState('');
  const [loginOrNot,setLoginOrNot] = useState(false);
  const contextValue: MyContextValue = {
    username,loginOrNot,setusername,setLoginOrNot
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};
export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

function App() {
  
  return (
    <MyContextProvider>
      <Routes>
          <Route path="/" element={
            <Main></Main>
          } />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </MyContextProvider>
  )
}

export default App
