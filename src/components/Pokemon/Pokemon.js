import React, { useState, useEffect }  from 'react';
import Image from '../Image/Image';

function Pokemon({data, setShowAnswer}) {
  const [dispFlyDivs, setDispFlyDivs] = useState(0)
  
  const runShowAnswer = () => {
    setShowAnswer(' ')
  }

  // generate css for feathers styling
  const computeStyle = () => {
    // TEMP
    let show = data.divs === null ? 1 : data.divs < 17 ? data.divs : 15
    setDispFlyDivs(show)

    // polished version with column styling
    // let cols = Math.ceil(Math.sqrt(flyingDivs))
    // console.log("computing styles: cols", cols)

  }
  useEffect(() => {
    computeStyle()
  })

  return (
    <button id="feathers-btn" onClick={runShowAnswer}>
    <div className={`feathers-container`} >
      {
        Array.from(Array(dispFlyDivs)).map((x, index) => 
          <Image key={index} pkmnData={data}/>
        )  
      }

      { dispFlyDivs !== 15 ? null :
        <div>
          <p>...</p>
        </div>
      }
    </div>

    {/* feathers description */}
    <div className="pokemon-btn-desciption">
    <p>{data.divs === 1 ? 'One' : data.divs } <b>{data.name}</b></p>
    </div>
  </button>
  )
}

export default Pokemon

