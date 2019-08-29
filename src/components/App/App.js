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
  const [winner, setWinner] = useState(0) // -1 for steel winning/ +1 for steel losing
  const [steelData, setSteelData] = useState({type: 'steel', display: ' '})
  const [flyingData, setFlyingData] = useState({type: 'flying', display: ' '})

  // game logic
  const [showAnswer, setShowAnswer] = useState('hidden')
  const [gameRound, setGameRound] = useState(0)
  const [points, setPoints] = useState(0)
  const [history, setHistory] = useState([])

  useEffect(() => { 
    decideWinner()
    fetchPkmnUrl('steel')
    fetchPkmnUrl('flying')
  }, [gameRound])

  useEffect(() => { 
    calculateImgs() 
    }, [steelData.weight, flyingData.weight])

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

      type === 'steel' ? 
      setSteelData(steelData => ({...steelData, ...result})) :
      setFlyingData(flyingData => ({...flyingData, ...result}))

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
      setSteelData(steelData => ({...steelData, image})) : 
      setFlyingData(flyingData => ({...flyingData, image}))

    } catch(error) {
      console.log('error', error)
    }
  }

  const calculateImgs = () => {
    let steelWeight = steelData.weight
    let flyingWeight = flyingData.weight

    const round = (divs, divisor, winner) => {
      if (winner === -1) {
        return Math.floor((divs + winner)/divisor)*divisor 
      } else if (winner === 1) {
        return Math.ceil((divs + winner)/divisor)*divisor
      } else {
        console.log('ERROR, CHECK WINNER VALUE')
      }
    }

    if (steelWeight > flyingWeight) { 
      let divs = steelWeight / flyingWeight
      console.log("WINNING ROUNDING IS", winner)
      console.log('divs before', divs)
      switch (true) {
        case (divs <= 9):  
          divs = Math.ceil(divs + winner)
          break; 
        case (divs <= 50):
          divs = round(divs, 5, winner)
          break;
        case (divs <= 100):
          divs = round(divs, 10, winner)
          break;
        case (divs <= 200):
          divs = round(divs, 10, winner)
          break;
        case (divs <= 250):
          divs = round(divs, 25, winner)
          break;
        case (divs <= 500):
          divs = round(divs, 50, winner)
          break;
        case (divs <= 1000):
          divs = round(divs, 100, winner)
          break;
        case (divs <= 2000):
          divs = round(divs, 250, winner)
          break;
        case (divs > 2000):
          divs = round(divs, 500, winner)
          break;
      }

      console.log('divs after', divs)
      setSteelData(steelData => ({...steelData, divs: 1}))
      setFlyingData(flyingData => ({...flyingData, divs}))
      
    } else if (flyingWeight > steelWeight) {
      console.warn('warning: flyingweight > steelweight: write logic for this case')
      setFlyingData(flyingData => ({...flyingData, divs: 1}))
      setSteelData(steelData => ({...steelData, divs: 1}))
    } else {
      console.log('big error/no weights fetched yet during this render')
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
                setFlyingData={setFlyingData}
                setSteelData={setSteelData}
                winner={winner}
              />
            </div>
          }

          { 
            !flyingData ? null :
            <div>
              <Pokemon 
                data={flyingData}
                setShowAnswer={setShowAnswer}
                setFlyingData={setFlyingData}
                setSteelData={setSteelData}
                winner={winner}
              />
            </div>
          }

        </div>

        <Answer 
          steelData={steelData} 
          flyingData={flyingData} 
          setFlyingData={setFlyingData}
          setSteelData={setSteelData}
          setGameRound={setGameRound} 
          showAnswer={showAnswer} 
          setShowAnswer={setShowAnswer}
          setHistory={setHistory}
        />

      </div>

      <div className="game-container">
        <Score gameRound={gameRound}/>
        <Lives />
      </div>

      <div className="history-container">
        {
          history.map((el, i) => (
            <div key={i}>
              <p>{el.name}</p>
              <p>weight: {el.weight}</p>
            </div>
          )) 
        }
      </div>

      <Footer />
    </div>
  );
}

export default App;

