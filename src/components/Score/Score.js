import React from 'react';
function Score({gameRound}) {
  return (
    <div className="score-container">
      <div>
        <p>Score</p>
      </div>
      <div>
        <p>0/{gameRound}</p>
      </div>
    </div>
  )
}

export default Score