import { useState } from 'react';
import './index.css';
import debounce from '../../method/debonce';
import { useNavigate} from "react-router-dom";
import { fetchApi } from '../../method/fetch';
import { useMyContext } from '../../App';
import { useEffect } from 'react';

interface loginRes{
    msg:string
}
function Login(){
    const{setusername,setLoginOrNot}= useMyContext();
    const navigate = useNavigate()
    const [usernameforlogin,setuserNameforlogin]=useState(""); 
    const [password,setPassword]=useState("");
    async function sendlogin(){
        const loginRes:loginRes=await fetchApi({method:"post",url:'/user/login',content:{username:usernameforlogin,password:password}}); 
        if(loginRes.msg=='ok'){
            setusername(usernameforlogin);
            setLoginOrNot(true);
            navigate('/');
        } 
        else{
            alert("登录失败");
        }       
    }
    return(
        <>
            <div className="loginPage">
                <div className="loginbox">
                    <div className="loginTerm">
                       <div className='loginTag'>用户名：</div>
                       <input type="text" maxLength={15} onChange={(e)=>setuserNameforlogin(e.target.value)} />
                    </div>
                    <div className="loginTerm">
                        <div className='loginTag'>密码：</div>
                       <input type='password'  maxLength={15} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="loginTerm">
                        <div className="mainbutton" onClick={debounce(sendlogin,500)}>登录</div>
                    </div>
                    <div className="tipbutton" onClick={()=>navigate('/register')}>没有账号？点击注册</div>
                </div>
            </div>
        </>
    )
}
export default Login;