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
  // const [feathUrl, setFeathUrl] = useState('') //?? replace
  const [steelUrl, setSteelUrl] = useState('')
  const [feathData, setFeathData] = useState({name: '', weight: 0, image: '' })
  const [steelData, setSteelData] = useState({name: '', weight: 0, image: '' })

  useEffect(() => { 

    fetchSteelUrl()
  }, [])

  const fetchSteelUrl = async () => {
    let url = 'https://pokeapi.co/api/v2/type/steel'
    console.log('fetchPid requestURL:', url)
    try {
      let res = await fetch(url)
      let response = await res.json()
      
      // choose pokemon in arr
      let choice = Math.floor(response.pokemon.length * Math.random())
      let pokemon = response.pokemon[choice].pokemon.name
      let url2 = response.pokemon[choice].pokemon.url

      console.log(choice, pokemon, url2)
      fetchSteelData(url2)

    } catch(error) {
      console.log('error', error)
    }
  }

  const fetchSteelData = async (url) => {
    try {
      let res = await fetch(url)
      let response = await res.json()
      console.log(response)
      
      setSteelData({
        name: response.name,
        weight: response.weight,
        image: response.sprites.front_default
      })
      console.log(steelData)
    } catch(error) {
      console.log('error', error)
    }
  }

  

  return (
    <div className="App">
      <Title />

      <div className="main"> 
        <div className="pokemon-container">
          <Steel />
          <Feathers />
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
