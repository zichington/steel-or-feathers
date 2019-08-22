import React from 'react';
import Image from '../Image/Image';

function Feathers({flyingData}) {
  console.log('feathersData', flyingData)

  return (
    <button id="feathers-btn">
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

