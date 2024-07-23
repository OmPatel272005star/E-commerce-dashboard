import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    useEffect(()=>{
      const auth=localStorage.getItem('user');
      if(auth){
        navigate('/');
      }
    },[])
    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:3000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
        }else{
          alert('plz enter correct details')
        }
    };
 
    
    return (
        <div className='login'>
            <input type='text' placeholder='Enter email' className='inputbox' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Enter password' className='inputbox' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="appbutton" type='button'>Login</button>
        </div>
    );
}


