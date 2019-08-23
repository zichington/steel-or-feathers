import React from 'react';
import Image from '../Image/Image';

function Feathers({flyingData, winner, flyingDivs}) {
  console.log('winner', winner, 'flyingDivs',flyingDivs)
  const showWinner = () => {
    console.log('firing')
  }
  return (
    <button id="feathers-btn" onClick={showWinner}>
    <div className="feathers-container">
      {Array.from(Array(flyingDivs)).map((x, index) => <Image key={index} pkmnData={flyingData}/>)}
    </div>
    
    {/* feathers description */}
    <div className="pokemon-btn-desciption">
    <p>{flyingDivs} <b>{flyingData.name}</b></p>
    </div>
  </button>
  )
}

export default Feathers

