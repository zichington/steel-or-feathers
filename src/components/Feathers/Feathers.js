import React from 'react';
import Image from '../Image/Image';

function Feathers({flyingData, winner}) {
  console.log('feathersData', flyingData, winner)
  const showWinner = () => {
    console.log('firing')
  }
  return (
    <button id="feathers-btn" onClick={showWinner}>
    <div className="feathers-container">
      <Image pkmnData={flyingData}/>
    </div>
    {/* feathers description */}
    <div className="pokemon-btn-desciption">
    <p>One <b>{flyingData.name}</b></p>
    </div>
  </button>
  )
}

export default Feathers

