import React from 'react';
function Answer({steelData, flyingData, setFlyingData, setSteelData, setGameRound, showAnswer, setShowAnswer, setHistory}) {
  
  const resetAfterRound = () => {
    let none = {display: ' '}
    console.log('removing button display')
    addRoundToHistory()
    setFlyingData(flyingData => ({...flyingData, ...none}))
    setSteelData(steelData => ({...steelData, ...none}))
  }

  const addRoundToHistory = () => {
    setHistory(prev =>  [...prev, steelData, flyingData])
  }

  const clickHandler = () => {
    setGameRound(prev => prev + 1)
    setShowAnswer('hidden')
    resetAfterRound()
  }

  return (
    <div id="answer" className={showAnswer}>
      One {steelData.name} is as heavy as <b>{steelData.weight/flyingData.weight}</b> {flyingData.name}s !
    <button id="progress" onClick={clickHandler}>Next</button>
    </div>
  )
}

export default Answer

