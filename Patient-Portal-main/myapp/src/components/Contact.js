import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Contact() {

  const [name,setName] = useState('')
  const [mno,setMno] = useState('')
  const [msg,setMsg] = useState('')
  const [post,setPost] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3001/suggessions")
    .then(res=>setPost(res.data))
    .catch(err=>console.log(err))
  })

  const handleReports = ()=>{
    axios.post("http://localhost:3001/suggessions",{
      "name":name,
      "mobileno":mno,
      "message":msg
    }).then(()=>{
      alert("Thank you for your suggessions!...")
    }).catch(()=>{
      alert("Something went wrong!...")
    })
  }

  return (
    <>
    <div className='Contact'>
        <div className="container fadeLeft">
          <form onSubmit={handleReports}>
            <h1>Suggession Box</h1>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name"/>

            <input type="text" value={mno} onChange={(e)=>setMno(e.target.value)} placeholder="Mobile No"/>

            <textarea placeholder="Write something.." value={msg} onChange={(e)=>setMsg(e.target.value)}></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className='img-container fadeRight'>
        </div>
    </div>
    <div className='Suggessions'>
      {post.map(x=>(
        <div className="fade-container fadeBottom">
          <h2>{x.name}</h2>
            <p className='fade-text'>
              {x.message}
            </p>
            <div className='transparentGlass'>
            </div>
        </div>
        
      ))}
    </div>
    </>
  )
}
