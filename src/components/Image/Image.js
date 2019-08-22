import React from 'react';
function Image({pkmnData}) {
  return (
    <img className="pokemon-img" src={pkmnData.image} alt="" />
  )
}

export default Image

