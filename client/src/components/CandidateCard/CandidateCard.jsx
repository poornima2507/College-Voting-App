import React from 'react'
import './CandidateCard.css'

const CandidateCard = ({ candidate, onVote, voted }) => {
  return (
    <div className='candidate-card'>
      <div className="candidate-details">
        <h3>{candidate.name}</h3>
        <p>{candidate.age}</p>
        <p>{candidate.party}</p>
        <button onClick={() => onVote(candidate._id)} disabled={voted}>Vote</button>
      </div>
    </div>
  )
}

export default CandidateCard
//The CandidateCard component presents individual candidate details, including their name, age, and party affiliation, along with a "Vote" button. This button triggers a voting function when clicked, and it is disabled if the user has already voted, ensuring that each user can only vote once per candidate.