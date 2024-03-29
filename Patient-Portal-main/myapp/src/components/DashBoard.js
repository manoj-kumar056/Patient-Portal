import React from 'react'
import { useAuth } from './Auth'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'


export default function DashBoard(){
    const navigate = useNavigate()
    const auth = useAuth()
  return(
    <div className='DashBoard'>
      <div className='navBar'>
        <NavLink to='details'>Dash Board</NavLink>
        <button onClick={()=>{
          auth.logout()
          navigate('/')
        }}>Log out</button>
      </div>
      <Outlet/>
    </div>
  )
}
