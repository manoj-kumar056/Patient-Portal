import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup(){
    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [mobileno,setMobileno] = useState('')
    const [password,setPassword] = useState('')

    const handleSignup = ()=>{
        axios.post("http://localhost:3001/users",{
            "username": username,
            "mobileno": mobileno,
            "email": email,
            "password": password
        }).then(()=>{
            alert("Sign up successfull!...")
        }).catch(()=>{
            alert("Something went wrong!...")
        })
        navigate('/login')
    }

  return(
    <div className='Signup'>
      <div className="container">
          <form onSubmit={handleSignup}>
            <h1>Sign up</h1>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="User name" required/>

            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" required/>

            <input value={mobileno} onChange={(e)=>setMobileno(e.target.value)} type="text" placeholder="Mobile Number" required/>

            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>

            <button type="submit">Sign up</button>
            <p>Have an account? <Link to='/login'>Login</Link></p>
          </form>
        </div>
    </div>
  )
}
