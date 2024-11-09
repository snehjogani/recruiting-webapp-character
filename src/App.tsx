import React, { useContext } from 'react';
import './App.css';
import { CharacterContext } from './context/CharacterContext';
import CharacterCard from './components/CharacterCard';

function App() {
  const { characters } = useContext(CharacterContext)
  return (
    <div className="App">
      {characters.map((character, index) => (
        <section key={index} className="App-section">
          <CharacterCard character={character} />
        </section>
      ))}
    </div>
  )
};

export default App;