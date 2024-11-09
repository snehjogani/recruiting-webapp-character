import { useContext } from 'react';
import './App.css';
import { CharacterContext } from './context/CharacterContext';
import CharacterCard from './components/CharacterCard';

function App() {
  const { characters, createCharacter, getCharacters, saveCharacters } = useContext(CharacterContext)
  return (
    <div className="App">
      <section className='App-header'>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={createCharacter}>Add Character</button>
          <button onClick={getCharacters}>Get Characters</button>
          <button onClick={saveCharacters}>Save Characters</button>
        </div>
      </section>
      {characters.map((character, index) => (
        <section key={index} className="App-section">
          <CharacterCard character={character} />
        </section>
      ))}
    </div>
  )
};

export default App;