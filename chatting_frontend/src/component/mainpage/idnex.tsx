import { useState ,useEffect} from 'react';
import './index.css';
import {useNavigate} from "react-router-dom";
import { useMyContext } from '../../App';
import debounce from '../../method/debonce';


interface ChattingContent{
  username: string,
  data: string,
  date: string
}

function Main(){
    const [content,setcontent]=useState<ChattingContent[]>([])
    const [ws,setWs]=useState<WebSocket|null>();
    const [inputValue,setInputValue]=useState('');
    const{username,loginOrNot}= useMyContext();
    const navigate = useNavigate()
    useEffect(()=>{
        if(!loginOrNot){navigate('/register')}
        else{
           const newWs = new WebSocket('ws://localhost:3001');
            newWs.addEventListener('open', () => {
              console.log('WebSocket connected');
              setWs(newWs);
            });      
            newWs.addEventListener('close', (event) => {
              console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`);
            });    
            newWs.addEventListener('error', (error) => {
              console.error('WebSocket error:', error);
            });
            newWs.addEventListener('message', (msg) => {
              console.log(msg.data);
              
              setcontent((pre)=>{return [...pre, JSON.parse(msg.data)]});
            });
            return () => {
                setTimeout(() => {
                  newWs.close();
                }, 1000);
            }
        }
    },[])
    function sendmessage(){
      if(!inputValue){
        alert("请输入内容")
      }  
      else if(ws){            
            ws.send(JSON.stringify({
                username:username,
                data:inputValue
            }));
            setInputValue('');
        }
        else{
            alert('连接错误')
        }
    }
    return(
        <>
          <div className='mainPage'>
            <div className="topbar">
              <div className="title">OnlineChatting</div>
              <div className="username">{username}</div>
            </div>
            <div className='contentsbox'>
              {content?.map((item,index)=>{return(
              <div className={username==item.username?"mycontentbox":"elsecontentbox"} key={index+10000*Math.random()}>
                <div className='avatar'>{item.username[0]}</div>
                <div className='content'>{item.data}</div>
                <div className='content_user'>{item.username}</div>
                <div className='time_stick'>{item.date.split('G')[0]}</div>
              </div>
              )})}
            </div>
            <input type="text" className='input' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
            <div className="sendmessage" onClick={debounce(sendmessage,500)}>发送</div>
          </div>
        </>
    )
}
export default Main;