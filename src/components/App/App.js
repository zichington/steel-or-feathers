import React from 'react';
import './App.css';
import Title from '../Title/Title';
import Score from '../Score/Score';
import Lives from '../Lives/Lives';
import Footer from '../Footer/Footer';
import Steel from '../Steel/Steel';
import Feathers from '../Feathers/Feathers';
import Answer from '../Answer/Answer';

function App() {

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
