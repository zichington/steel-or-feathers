import React, { useState, useEffect }  from 'react';
import Image from '../Image/Image';
import './Pokemon.css'

function Pokemon({data, setFlyingData, setSteelData, winner, setShowAnswer}) {
  const [dispFlyDivs, setDispFlyDivs] = useState(0)
  
  const addBtnStyling = () => {
    let red = {display: 'red'}
    let green = {display: 'green'}
    
    if (winner === -1) {
      setFlyingData(flyingData => ({...flyingData, ...red}))
      setSteelData(steelData => ({...steelData, ...green}))
    } else if (winner === 1) {
      setFlyingData(flyingData => ({...flyingData, ...green}))
      setSteelData(steelData => ({...steelData, ...red}) )
    }
  }

  const handleShowAnswer = () => {
    setShowAnswer(' ')
    addBtnStyling()
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
    <button id="pkmn-btn" onClick={handleShowAnswer} className={data.display}>
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

    <div className="pokemon-btn-desciption">
    <p>{data.divs === 1 ? 'One' : data.divs } <b>{data.name}</b></p>
    </div>
  </button>
  )
}

export default Pokemon

