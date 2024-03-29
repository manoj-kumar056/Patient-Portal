import React from 'react'
import '../images/Logo.png'
import {NavLink} from 'react-router-dom'
import { useAuth } from './Auth'

export default function Navbar() {
  const auth = useAuth()

  return (
    <div className='navBar'>
        <div className="logo">
            {/* Logo */}
        </div>
        <ul className="nav">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/service'>Service</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
            {!auth.user && <NavLink to='/login'>Login</NavLink>}
            {auth.user && <NavLink to='/dashboard'>Dash Board</NavLink>}
        </ul>
    </div>
  )
}
