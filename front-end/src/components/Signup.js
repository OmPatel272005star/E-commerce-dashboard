import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      const auth = localStorage.getItem('user');
      if (auth) {
          navigate('/');
      }
  }, [])

  const collectData = async () => {
      let result = await fetch('http://localhost:3000/register', {
          method: 'post',
          body: JSON.stringify({ name, email, password }),
          headers: {
              'Content-Type': 'application/json'
          },
      });
      result = await result.json();
      console.warn(result);
      localStorage.setItem('user', JSON.stringify(result.result));
      localStorage.setItem('token', JSON.stringify(result.auth));
      if(result){
        navigate('/');
      }
  }

  return (
      <div>
          <h1 className='register'>Register</h1>
          <input className='inputbox' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
          <input className='inputbox' type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
          <input className='inputbox' type='password' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
          <button onClick={collectData} className="appbutton" type='button'>Sign Up</button>
      </div>
  )
}


// const collectData = async () => {
//     let result = await fetch('http://localhost:3000/register', {
//         method: 'post',
//         body: JSON.stringify({ name, email, password }),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//     result = await result.json();
//     console.warn(result);
//     localStorage.setItem('user', JSON.stringify(result.result));
//     localStorage.setItem('token', JSON.stringify(result.auth));
//     if(result){
//       navigate('/');
//     }
// }