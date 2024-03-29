import React, { useEffect, useState } from 'react'
import { useAuth } from './Auth'
import axios from 'axios'

export default function DashBoardDetails(){
    const auth = useAuth()
    const [post,setPost] = useState([])
    const [details,setDetails] = useState([])

    const username = auth.user

    useEffect(()=>{
        axios.get("http://localhost:3001/users")
        .then(res=>{
          setPost(res.data)
        })
        .catch(err=>console.log(err))

        axios.get("http://localhost:3001/reports")
        .then(res=>{
          setDetails(res.data)
        })
        .catch(err=>console.log(err))
    },[post,details])

    const [post1,setPost1] = useState([])

    // States for values - Create
    const [name,setName] = useState('')
    const [disease,setDisease] = useState('')
    const [report,setReport] = useState('')
    const [medicines,setMedicines] = useState('')
    const [recheckup,setRecheckup] = useState('')

    function generateRandom4DigitNumber() {
      return Math.floor(Math.random() * 9000) + 1000;
    }

    function getCurrentDate() {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
    
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();
    
      return `${day} ${month}, ${year}`;
    }

    // Create Operation
    const handleCreate = (e)=>{
      axios.post("http://localhost:3001/reports",{
        "id":generateRandom4DigitNumber().toString(),
        "name":name,
        "disease": disease,
        "date": getCurrentDate(),
        "report": report,
        "medicines": medicines,
        "check_up_date": recheckup
      })
      .then(()=>alert("Added successfully!..."))
      .catch(err=>console.log(err))

      e.preventDefault()
    }

    // Read Operation
    useEffect(()=>{
        axios.get("http://localhost:3001/reports")
        .then(res=>setPost1(res.data))
        .catch(err=>console.log(err))
    })

    // Delete Operation
    const handleDelete = (id)=>{

      console.log("Deleted")
      axios.delete(`http://localhost:3001/reports/${id}`)
      .then(()=>alert("Deleted sucessfully!..."))
      .catch(err=>console.log(err))
    }

    // States for values - Update
    const [popup,setPopup] = useState(false)
    const [id1,setId1] = useState('')
    const [name1,setName1] = useState('')
    const [date1,setDate1] = useState('')
    const [disease1,setDisease1] = useState('')
    const [report1,setReport1] = useState('')
    const [medicines1,setMedicines1] = useState('')
    const [recheckup1,setRecheckup1] = useState('')

    // Update operation
    const openPopup = (x)=>{
      setPopup(true) 
      setId1(x.id)
      setName1(x.name)
      setDate1(x.date)
      setReport1(x.report)
      setDisease1(x.disease)
      setMedicines1(x.medicines)
      setRecheckup1(x.check_up_date)
    }

    const handleUpdate = (e)=>{
      console.log("Update!.."+id1)
      axios.put(`http://localhost:3001/reports/${id1}`,{
        "id":id1,
        "name":name1,
        "disease": disease1,
        "date": date1,
        "report": report1, 
        "medicines": medicines1,
        "check_up_date": recheckup1
      })
      .then(()=>setPopup(false))
      .catch(()=>console.log("err"))

      e.preventDefault()
    }
    

  return (
    <div className='dashboradDetails'>
      <div className='container'>
        {details.map(x=>( (username === x.name) && 
          <div className='report'>
            <div className='Top'>
            <span><p>{x.disease}</p></span>
            <span><p>{x.date}</p></span>
          </div>
          <div className='description'>
            <h4>Report : </h4>
            <p>{x.report}</p>
            <h4>Medicines : </h4>
            <p>{x.medicines}</p>
            <h4>Check up date : </h4>
            <p>{x.check_up_date}</p>
          </div>
        </div>
        ))}
      </div>

      {
        auth.user === "Doctor" && 
        <>
        <div className='Container'>
          <form onSubmit={handleCreate}>
            <h2>ADD REPORT</h2>

            <div className='input-box'>
              <select value={name} onChange={(e) => setName(e.target.value)}>
                <option value="">Select Patient Name</option>
                {post.map((x, index) => (x.username !== "Doctor" &&
                  <option key={index} value={x.username}>
                    {x.username} | {x.email}
                  </option>
                ))}
                </select>
            </div>
            
            <div className='input-box'>
              <input type='text' value={disease} onChange={(e)=>{setDisease(e.target.value)}} required/>
              <span>Disease</span>
            </div>

            <div className='input-box'>
              <input type='text' value={report} onChange={(e)=>{setReport(e.target.value)}} required/>
              <span>Report</span>
            </div>

            <div className='input-box'>
              <input type='text' value={medicines} onChange={(e)=>{setMedicines(e.target.value)}} required/>
              <span>Medicines</span>
            </div>

            <div className='input-box'>
              <input type='date' value={recheckup} onChange={(e)=>{setRecheckup(e.target.value)}} required/>
              <span>Checkup Date</span>
            </div>

            <div className='input-box'>
              <button type='submit'>Add</button>
            </div>
          </form>
          <div className='table-container'>
            <table>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Disease</th>
                      <th>Report</th>
                      <th>Medicines</th>
                      <th>Next Checkup Date</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {post1.map(x=>(
                      <tr key={x.id}>
                          <td>{x.name}</td>
                          <td>{x.disease}</td>
                          <td>{x.report}</td>
                          <td>{x.medicines}</td>
                          <td>{x.check_up_date}</td>
                          <td>
                            <div className='btns'>
                              <button onClick={()=>openPopup(x)}>Update</button>
                              <button onClick={()=>handleDelete(x.id)}>Delete</button>
                            </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
            </table>
          </div>
        <br />
      </div>
    {popup && 
      <div className='popup'>
        <form onSubmit={handleUpdate}>
          <h2>UPDATE DETAILS</h2>

          <div className='input-box'>
            <input type='text' value={name1} required/>
            <span>Disease</span>
          </div>

          <div className='input-box'>
            <input type='text' value={disease1} onChange={(e)=>{setDisease1(e.target.value)}} required/>
            <span>Disease</span>
          </div>

          <div className='input-box'>
            <input type='text' value={report1} onChange={(e)=>{setReport1(e.target.value)}} required/>
            <span>Report</span>
          </div>

          <div className='input-box'> 
            <input type='text' value={medicines1} onChange={(e)=>{setMedicines1(e.target.value)}} required/>
            <span>Medicines</span>
          </div>

          <div className='input-box'>
            <input type='date' value={recheckup1} onChange={(e)=>{setRecheckup1(e.target.value)}} required/>
            <span>Checkup Date</span>
          </div>

          <div className='input-box btns'>
            <button onClick={()=>setPopup(false)}>Close</button>
            <button type='submit'>Update</button>
          </div>
        </form>
      </div>
      }
    </>
      }

    </div>
  )
}
