import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from './Auth'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const [userList,setUserlist] = useState([])
  
    useEffect(()=>{
      axios.get("http://localhost:3001/users")
      .then(res=>setUserlist(res.data))
      .catch(err=>console.log(err))
    },[])

    const auth = useAuth()

    const handleLogin = ()=>{
        const isUserExist = userList.some(u=>
            u.username === username && u.password === password
        )

        if(isUserExist){
            auth.login(username)
            navigate('/dashboard')
        }else{
            alert("Invalid Password")
        }
    }

  return (
    <div className='Login'>
      <div className="container">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="User name" required/>

            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required/>

            <button type="submit">Log in</button>
            <p>Don't have an account?<Link to='/signup'> Sign up</Link></p>
          </form>
        </div>
    </div>
  )
}
