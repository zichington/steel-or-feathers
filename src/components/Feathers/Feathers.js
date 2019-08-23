import React, { useState, useEffect }  from 'react';
import Image from '../Image/Image';

function Feathers({flyingData, flyingDivs, setShowAnswer}) {
  const [dispFlyDivs, setDispFlyDivs] = useState(0)
  
  const showAnswer = () => {
    setShowAnswer(' ')
  }

  // generate css for feathers styling
  const computeStyle = () => {
    // TEMP
    let show = flyingDivs < 17 ? flyingDivs : 15
    setDispFlyDivs(show)

    // polished version with column styling
    // let cols = Math.ceil(Math.sqrt(flyingDivs))
    // console.log("computing styles: cols", cols)

  }
  useEffect(() => {
    computeStyle()
  })

  return (
    <button id="feathers-btn" onClick={showAnswer}>
    <div className={`feathers-container`} >
      {
        Array.from(Array(dispFlyDivs)).map((x, index) => 
          <Image key={index} pkmnData={flyingData}/>
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
    <p>{flyingDivs} <b>{flyingData.name}</b></p>
    </div>
  </button>
  )
}

export default Feathers

