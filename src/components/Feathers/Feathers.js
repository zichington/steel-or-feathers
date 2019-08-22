import React from 'react';
import Image from '../Image/Image';

function Feathers({pkmnData}) {
  console.log('feathersData', pkmnData)

  return (
    <button id="feathers-btn">
    <div className="feathers-container">
      <Image pkmnData={pkmnData}/>
    </div>
    {/* feathers description */}
    <div className="pokemon-btn-desciption">
      <p>Ten <b>Altarias</b></p>
    </div>
  </button>
  )
}

export default Feathers

