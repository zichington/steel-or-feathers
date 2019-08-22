import React from 'react';
function Steel({steelData}) {
  console.log('steelData', steelData)

  return (
    <button id="steel-btn">
    <img className="pokemon-img" src={steelData.image} alt=""/>
    <div className="pokemon-btn-desciption">
      <p>One <b>{steelData.name}</b></p>
    </div>
  </button>
  )
}

export default Steel

