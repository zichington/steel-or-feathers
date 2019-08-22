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
  const [pkmnData, setPkmnData] = useState({steel: {}, feathers: {}})

  useEffect(() => { 
    fetchPkmnUrl('steel')
    // fetchPkmnUrl('flying')
  }, [])

  const fetchPkmnUrl = async (type) => {
    let url = `https://pokeapi.co/api/v2/type/${type}`
    console.log('pkmn requestURL:', url)
    try {
      let res = await fetch(url)
      let response = await res.json()
      
      // choose pokemon in arr
      let choice = Math.floor(response.pokemon.length * Math.random())
      let pokemon = response.pokemon[choice].pokemon.name
      let url2 = response.pokemon[choice].pokemon.url

      console.log(choice, pokemon, url2)
      fetchPkmnData(type, url2)

    } catch(error) {
      console.log('error', error)
    }
  }

  const fetchPkmnData = async (type, url) => {
    try {
      console.log(type)
      let res = await fetch(url)
      let response = await res.json()
      console.log('func2 response', response)

      if (type === 'steel') {
        console.log('steel is true')
        let steel = {
          name: response.name,
          weight: response.weight,
          image: response.sprites.front_default
        }
        setPkmnData({steel: steel})
        console.log(pkmnData)

      } 
      else if (type === 'flying') {
        console.log('flying is true')

        let feathers = {
          name: response.name,
          weight: response.weight,
          image: response.sprites.front_default
        }
        setPkmnData({feathers: feathers})
        console.log(pkmnData)

      }
    } catch(error) {
      console.log('error', error)
    }
  }

  return (
    <div className="App">
      <Title />

      <div className="main"> 
        <div className="pokemon-container">
          { !pkmnData.steel ? null :
            <Steel steelData={pkmnData.steel}/>
          }
          { !pkmnData.feathers ? null :
            <Feathers feathersData={pkmnData.feathers}/>
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
