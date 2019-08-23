import React, { useEffect, useState } from 'react';
import './App.css';
import Title from '../Title/Title';
import Score from '../Score/Score';
import Lives from '../Lives/Lives';
import Footer from '../Footer/Footer';
import Steel from '../Steel/Steel';
import Feathers from '../Feathers/Feathers';
import Answer from '../Answer/Answer';

function App() {
  const [pkmnData, setPkmnData] = useState({steel: {}, flying: {}})
  const [flyingDivs, setFlyingDivs] = useState(0)
  const [winner, setWinner] = useState(0) // +1 for steel losing, -1 for steel winning

  useEffect(() => { 
    decideWinner()
    fetchPkmnUrl('steel')
    fetchPkmnUrl('flying')
  }, [])

  useEffect(() => {
    calculateImgs()
  }, [pkmnData])

  const decideWinner = () => {
    let winner = (Math.floor(Math.random() * 2) === 0) ? -1 : +1
    setWinner(winner)
  }

  // type agnostic 
  const fetchPkmnUrl = async (type) => {
    let url = `https://pokeapi.co/api/v2/type/${type}`
    console.log('pkmn requestURL:', url)
    try {
      let res = await fetch(url)
      let response = await res.json()
      
      // choose pokemon in arr
      let choice = Math.floor(response.pokemon.length * Math.random())
      let pokemon = response.pokemon[choice].pokemon.name
      let detailUrl = response.pokemon[choice].pokemon.url

      console.log(choice, pokemon, detailUrl)
      fetchPkmnData(type, detailUrl)

    } catch(error) {
      console.log('error', error)
    }
  }

  const fetchPkmnData = async (type, url) => {
    try {
      console.log('steel/flying type = ', type);
      let res = await fetch(url)
      let response = await res.json()
      let result = {
        name: response.name,
        weight: response.weight,
        image: response.sprites.front_default
      }
      setPkmnData(pkmnData => {return {...pkmnData, [type]: result}} )

      if (response.sprites.front_default === null) {
        fetchFormSprite(type,response.forms[0].url) 
      }

      if (response.weight === null) {
        alert('issue fetching weight', )
      }

    } catch(error) {
      console.log('error', error)
    }
  }

  const fetchFormSprite = async (type, url) => {
    try {
      let res = await fetch(url)
      let response = await res.json()
      let image = response.sprites.front_default
      setPkmnData(pkmnData => {return {...pkmnData, [type]: {...pkmnData[type], image}}} )
    } catch(error) {
      console.log('error', error)
    }
  }

  const calculateImgs = () => {
    let steelWeight = pkmnData.steel.weight
    let flyingWeight = pkmnData.flying.weight

    if (steelWeight >= flyingWeight) { // handle normal winning logic
      // calculation to get total number of featherDivs
      console.log('CalculateImgs: this is being fired')
      let flyingDivs = Math.floor(pkmnData.steel.weight / pkmnData.flying.weight) + winner
      setFlyingDivs(flyingDivs)
      
    } else if (flyingWeight > steelWeight) {
      console.warn('write logic for this case')
      setFlyingDivs(1)
    } else {
      console.log('big error')
    }
  }

  return (
    <div className="App">
      <Title />

      <div className="main"> 
        <div className="pokemon-container">
          { !pkmnData.steel ? null :
            <div>
              <Steel steelData={pkmnData.steel} winner={winner}/>
            </div>

          }
          { !pkmnData.flying ? null :
            <div>
              <Feathers flyingData={pkmnData.flying} winner={winner} flyingDivs={flyingDivs}/>
            </div>
          }
        </div>
        <Answer />
      </div>

      <div className="game-container">
        <Score />
        <Lives />
      </div>

      <Footer />
    </div>
  );
}

export default App;
