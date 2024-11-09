import React, { createContext, useEffect, useState } from "react";
import { Attributes, Character } from "../types";

interface AppState {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  createCharacter: () => void;
}

export const CharacterContext = createContext<AppState>({
  characters: [],
  setCharacters: undefined,
  createCharacter: undefined
});

interface AppProps {
  children: React.ReactNode;
}

const CharacterContextProvider = ({ children }: AppProps) => {
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    // Make sure the app loads with at least 1 character on start up
    return () => {
      if (characters.length === 0) {
        createCharacter()
      }
    }
  }, [])

  const createCharacter = () => {
    const defaultAttributes: Attributes = {
      Strength: 10,
      Dexterity: 10,
      Constitution: 10,
      Intelligence: 10,
      Wisdom: 10,
      Charisma: 10,
    }

    setCharacters(list => [...list, { id: `${characters.length + 1}`, attributes: defaultAttributes }])
  }

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        createCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
};

export default CharacterContextProvider;