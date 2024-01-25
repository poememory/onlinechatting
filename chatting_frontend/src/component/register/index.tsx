import { useState } from 'react';
import './index.css';
import debounce from '../../method/debonce';
import { useNavigate} from "react-router-dom";
import { fetchApi } from '../../method/fetch';


function Register(){
    interface registerRes{
        msg:string
    }
    const navigate = useNavigate()
    const [username,setuserName]=useState("");
    const [password,setPassword]=useState("");
    const [passwordConfirm,setPasswordConfirm]=useState("");
    async function sendRegister(){
            if(password==passwordConfirm&&password){
                const registerRes:registerRes=await fetchApi({method:"post",url:'/user/register',content:{username:username,password:password}}); 
                if(registerRes.msg=='success'){
                    navigate('/login');
                } 
            }
            else{
                alert("确认两次密码输入相同")
            }
    }
    return(
        <>
            <div className="RegisterPage">
                <div className="registerbox">
                    <div className="registerTerm">
                       <div className='registerTag'>用户名：</div>
                       <input type="text" maxLength={15} onChange={(e)=>setuserName(e.target.value)} />
                    </div>
                    <div className="registerTerm">
                        <div className='registerTag'>密码：</div>
                       <input type='password'  maxLength={15} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="registerTerm">
                        <div className='registerTag'>确认密码：</div>
                       <input type='password'  maxLength={15} onChange={(e)=>setPasswordConfirm(e.target.value)} />
                    </div>
                    <div className="registerTerm">
                        <div className="mainbutton" onClick={debounce(sendRegister,500)}>注 册</div>
                    </div>
                    <div className="tipbutton" onClick={()=>navigate('/login')}>已有账号，点击登录</div>
                </div>
            </div>
        </>
    )
}
export default Register;