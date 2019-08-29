import React from 'react';
function Image({data}) {
  return (
    <img className="pokemon-img" src={data.image} alt="" />
  )
}

export default Image

