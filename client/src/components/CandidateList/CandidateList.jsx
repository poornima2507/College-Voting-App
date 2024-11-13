import React, { useEffect, useState } from 'react'
import './CandidateList.css'
import CandidateCard from '../CandidateCard/CandidateCard'
import { BASE_URL } from '../../server'
const CandidateList = ({ onVote, voted }) => {
      const [candidates, setCandidates] = useState([])

      useEffect(() => {
            fetch(`${BASE_URL}/api/v1/candidate/candidates`)
                  .then((res) => res.json()).then((data) => setCandidates(data))
      }, [])

      return (
            <div className='candidates-container'>
                  {candidates.map(candidate => (
                        <CandidateCard key={candidate._id} candidate={candidate} onVote={onVote} voted={voted} />
                  ))}
            </div>
      )
}

export default CandidateList
//The CandidateList component fetches and displays a list of candidates by mapping over the retrieved data and rendering a CandidateCard for each candidate. It uses the onVote function and voted status as props, allowing users to vote while maintaining the voting state for each candidate.



