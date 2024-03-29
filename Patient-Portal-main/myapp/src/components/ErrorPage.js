import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className='ErrorBg'>
        <h1>404 ERROR</h1>
      <div className='img-container'>
      </div>
      <h2>Page not Found</h2>
      <button onClick={()=>navigate(-1)}>Go Back</button>
    </div>
  )
}
