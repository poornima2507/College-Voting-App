import React, { useEffect, useState } from 'react'
import './AddCandidate.css'
import { BASE_URL } from '../../server'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddCandidate = () => {
      const navigate = useNavigate()
      const [token, setToken] = useState('')
      const [formData, setFormData] = useState({
            name: "",
            age: "",
            party: ""
      })
      const changeHandler = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
      }

      useEffect(() => {
            const storedToken = localStorage.getItem('token')
            if (storedToken) {
                  setToken(storedToken);
            }
      }, [])

      const addCandidate = async () => {
            let responseData;
            await fetch(`${BASE_URL}/api/v1/candidate`, {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(formData)
            }).then((res) => res.json()).then((data) => responseData = data)
            console.log(responseData)
            if (responseData.success) {
                  toast.success(' Candidate added successfully')
                  console.log(responseData)
                  navigate('/admin')
            } else {
                  toast.success(responseData.errors)
            }
      }


      return (
            <div className='add-candidate'>
                  <div className="addcandidate-fields">
                        <div className='form'>
                              <h2><strong>Add Candidate</strong></h2>
                              <input className='form-control' name='name' value={formData.name} onChange={changeHandler} type="text" placeholder=' Candidate Name' />
                              <input className='form-control' name='age' value={formData.age} onChange={changeHandler} type="text" placeholder='Age' />
                              <input className='form-control' name='party' value={formData.party} onChange={changeHandler} type="text" placeholder='Branch' />
                              <button className='btn' onClick={addCandidate}>Add</button>
                        </div>
                  </div>
            </div>
      )
}

export default AddCandidate
//This React component, AddCandidate, allows users to input details for a new candidate (name, age, party) and submit the data to an API. It uses state to manage the form data and authentication token, employs useEffect to retrieve the token from local storage, and sends a POST request to add the candidate, providing user feedback with toast notifications based on the success of the operation.