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

  useEffect(() => { 
    fetchPkmnUrl('steel')
    fetchPkmnUrl('flying')
  }, [])

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

  return (
    <div className="App">
      <Title />

      <div className="main"> 
        <div className="pokemon-container">
          { !pkmnData.steel ? null :
            <div>
              <Steel steelData={pkmnData.steel}/>
            </div>

          }
          { !pkmnData.flying ? null :
            <div>
              <Feathers flyingData={pkmnData.flying}/>
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
