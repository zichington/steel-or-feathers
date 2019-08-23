import React from 'react';
function Steel({steelData, setShowAnswer}) {
  const showAnswer = () => {
    setShowAnswer(' ')
  }
  return (
    <button id="steel-btn" onClick={showAnswer}>
    <img className="pokemon-img" src={steelData.image} alt=""/>
    <div className="pokemon-btn-desciption">
      <p>One <b>{steelData.name}</b></p>
    </div>
  </button>
  )
}

export default Steel

