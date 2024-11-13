import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import candidate from '../../assets/user.jpg'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../server'
const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([])
  const [token, setToken] = useState('')

  const fetchInfo = async () => {
    await fetch(`${BASE_URL}/api/v1/candidate/candidates`)
      .then((res) => res.json()).then((data) => setCandidates(data))
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken);
    }
  }, [])

  useEffect(() => {
    fetchInfo();
  }, [])

  const removeCandidate = async (candidateId) => {
    let res;
    await fetch(`${BASE_URL}/api/v1/candidate/${candidateId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

    })
      .then((res) => res.json()).then((data) => res = data)
    console.log(res)
    await fetchInfo();

  }
  return (
    <div className='admin-dashboard'>
      <div className="admindashboard-left">
        <img src={candidate} alt="" />
        <Link to="/addcandidate"><button>New</button></Link>
      </div>
      <div className='list-candidate'>
        <h1>Candidates</h1>
        <div className="listcandidate-format-main">
          <p>Name</p>
          <p>Age</p>
          <p>Branch</p>
          <p>Delete</p>
        </div>
        <div className="listcandidate-candidates">
          <hr />
          {candidates.map((candidate, index) => {
            return <> <div key={index} className='listcandidate-format-main listcandidate-format'>
              <p>{candidate.name}</p>
              <p>{candidate.age}</p>
              <p>{candidate.party}</p>
              <button onClick={() => { removeCandidate(candidate._id) }}>Delete</button>
            </div>
              <hr />
            </>
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
//The AdminDashboard component displays a list of candidates along with their details (name, age, party) and provides functionality to delete candidates. It fetches the candidate data from an API upon component mount, manages authentication with a stored token, and updates the displayed candidate list after any deletion is performed.



