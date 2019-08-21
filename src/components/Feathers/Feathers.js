import React from 'react';
import Image from '../Image/Image';

function Feathers() {
  return (
    <button id="feathers-btn">
    {/* feathers images */}
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

