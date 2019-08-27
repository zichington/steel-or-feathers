import React, { useEffect, useState } from 'react';
import Title from '../Title/Title';
import Score from '../Score/Score';
import Lives from '../Lives/Lives';
import Footer from '../Footer/Footer';
import Pokemon from '../Pokemon/Pokemon';
import Answer from '../Answer/Answer';
import './App.css';

function App() {
  // fetch and setup & display
  const [steelData, setSteelData] = useState({})
  const [flyingData, setFlyingData] = useState({})

  /*
  steelData / flyingData : {
    name: '',
    weight: 0,
    image: ''
    divs: ''
    display: '' / 'losing' : 'winning'
  }
  */

  const [winner, setWinner] = useState(0) // +1 for steel losing, -1 for steel winning

  // game logic
  const [gameRound, setGameRound] = useState(0)
  const [showAnswer, setShowAnswer] = useState('hidden')

  useEffect(() => { 
    decideWinner()
    fetchPkmnUrl('steel')
    fetchPkmnUrl('flying')
  }, [gameRound])

  useEffect(() => { calculateImgs() }, [steelData.weight, flyingData.weight])

  const decideWinner = () => {
    let winner = (Math.floor(Math.random() * 2) === 0) ? -1 : +1
    setWinner(winner)
  }

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
      let res = await fetch(url)
      let response = await res.json()
      let result = {
        name: response.name,
        weight: response.weight,
        image: response.sprites.front_default
      }
      type === 'steel' ? setSteelData(result) : setFlyingData(result)

      if (response.sprites.front_default === null) {
        fetchFormSprite(type, response.forms[0].url) 
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

      type === 'steel' ? 
      setSteelData(steelData => {return {...steelData, image}}) : 
      setFlyingData(flyingData => {return {...flyingData, image}})

    } catch(error) {
      console.log('error', error)
    }
  }

  const calculateImgs = () => {
    let steelWeight = steelData.weight
    let flyingWeight = flyingData.weight


    // BUG: if answer is 1.x and rounds down and reduces 1, the answer is 0
    if (steelWeight >= flyingWeight) { // handle normal winning logic
      // current case only deals with single digit +/- 1-20
      let divs = Math.floor(steelWeight / flyingWeight) + winner
      if (divs === 0) { divs++}
      // add more logic: 
        // if ratio is > 1:20, round up/down by +/- 5 
        // if ratio is > 1:50, round up/down by +/- 10 
        // if ratio is > 1:100, round up/down by +/- 25 
        // if ratio is > 1:150, round up/down by +/- 50
      setSteelData(steelData => {return {...steelData, divs: 1}})
      setFlyingData(flyingData => {return {...flyingData, divs}})
      
    } else if (flyingWeight > steelWeight) {
      console.warn('warning: flyingweight > steelweight: write logic for this case')
      setFlyingData(flyingData => {return {...flyingData, divs: 1}})
    } else {
      console.log('big error')
    }
  }

  return (
    <div className="App">
      <Title />

      <div className="main"> 
        <div className="pokemon-container">

          { 
            !steelData ? null :
            <div>
              <Pokemon 
                data={steelData} 
                setShowAnswer={setShowAnswer}
              />
            </div>
          }

          { 
            !flyingData ? null :
            <div>
              <Pokemon 
                data={flyingData} 
                setShowAnswer={setShowAnswer}
              />
            </div>
          }

        </div>

        <Answer 
          steelData={steelData} 
          flyingData={flyingData} 
          setGameRound={setGameRound} 
          showAnswer={showAnswer} 
          setShowAnswer={setShowAnswer}
        />

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
