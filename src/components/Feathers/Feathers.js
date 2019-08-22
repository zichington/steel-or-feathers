import React from 'react';
import Image from '../Image/Image';

function Feathers({feathersData}) {
  console.log('feathersData', feathersData)

  return (
    <button id="feathers-btn">
    <div className="feathers-container">
      <Image /><Image /><Image />
      <Image /><Image /><Image />
      <Image /><Image /><Image />
      <Image />
    </div>
    {/* feathers description */}
    <div className="pokemon-btn-desciption">
      <p>Ten <b>Altarias</b></p>
    </div>
  </button>
  )
}

export default Feathers

