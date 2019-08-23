import React from 'react';
function Answer({pkmnData, setGameRound, showAnswer, setShowAnswer}) {
  const clickHandler = () => {
    setGameRound(prev => prev + 1)
    setShowAnswer('hidden')
  }
  return (
    <div id="answer" className={showAnswer}>
      One {pkmnData.steel.name} is as heavy as <b>{pkmnData.steel.weight/pkmnData.flying.weight}</b> {pkmnData.flying.name}s !
    <button id="progress" onClick={clickHandler}>Next</button>
    </div>
  )
}

export default Answer

