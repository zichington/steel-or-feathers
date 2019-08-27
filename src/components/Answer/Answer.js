import React from 'react';
function Answer({steelData, flyingData, setGameRound, showAnswer, setShowAnswer}) {
  const clickHandler = () => {
    setGameRound(prev => prev + 1)
    setShowAnswer('hidden')
  }
  return (
    <div id="answer" className={showAnswer}>
      One {steelData.name} is as heavy as <b>{steelData.weight/flyingData.weight}</b> {flyingData.name}s !
    <button id="progress" onClick={clickHandler}>Next</button>
    </div>
  )
}

export default Answer

