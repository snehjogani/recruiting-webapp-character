import React, { createContext, useEffect, useState } from "react";
import { Attribute, Attributes, Character, SkillPoints } from "../types";
import { ATTRIBUTE_LIST, SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils";
import API from "../api/characters";

interface AppState {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  createCharacter: () => void;
  updateAttribute: (id: string, attribute: Attribute, delta: number) => void;
  updateSkillPoints: (id: string, skillName: string, delta: number) => void;
  getCharacters: () => Promise<void>;
  saveCharacters: () => Promise<void>;
}

export const CharacterContext = createContext<AppState>({
  characters: [],
  setCharacters: undefined,
  createCharacter: undefined,
  updateAttribute: undefined,
  updateSkillPoints: undefined,
  getCharacters: undefined,
  saveCharacters: undefined,
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

  const getCharacters = async () => {
    try {
      const response = await API.getCharacters()
      if (!!response.data.body?.characters) {
        setCharacters(response.data.body?.characters)
      }
    } catch (error) {
      alert("Something went wrong! Please try agian.")
    }
  }

  const saveCharacters = async () => {
    try {
      await API.saveCharacters(characters)
      alert("Characters saved successfully!")
    } catch (error) {
      alert("Something went wrong! Please try agian.")
    }
  }

  const createCharacter = () => {
    const defaultAttributes: Attributes = ATTRIBUTE_LIST.reduce((obj, attribute) => {
      obj[attribute] = 10
      return obj
    }, {} as Attributes)

    const defaultSkillPoints: SkillPoints = SKILL_LIST.reduce((obj, skill) => {
      const modifier = 0
      obj[skill.name] = {
        points: 0, // points allocated to the skill
        modifier, // the attribute modifier dependency of the skill
        total: 0, // final skill value (points + modifier)
      }
      return obj;
    }, {} as SkillPoints)

    setCharacters(list => [...list, { id: `${characters.length + 1}`, attributes: defaultAttributes, skillPoints: defaultSkillPoints }])
  }

  const updateAttribute = (id: string, attribute: Attribute, delta: number) => {
    let updatedCharacter = { ...characters.find(obj => obj.id === id) }

    updatedCharacter.attributes[attribute] += delta
    // Update skill points every time an attribute is updated 
    updatedCharacter.skillPoints = updateSkillPointsByAttributes(updatedCharacter.attributes, updatedCharacter.skillPoints)

    setCharacters(list => list.map((obj) => obj.id === id ? updatedCharacter : obj))
  }

  const updateSkillPointsByAttributes = (characterAttributes: Attributes, characterSkillPoints: SkillPoints) => {
    return SKILL_LIST.reduce((obj, skill) => {
      const attribute = skill.attributeModifier
      const modifier = calculateModifier(characterAttributes[attribute])
      obj[skill.name] = {
        points: characterSkillPoints[skill.name].points,
        modifier,
        total: characterSkillPoints[skill.name].points + modifier
      }
      return obj
    }, {} as SkillPoints)
  }

  const updateSkillPoints = (id: string, skillName: string, delta: number) => {
    let updatedCharacter = { ...characters.find(obj => obj.id === id) }

    const currentPoints = updatedCharacter.skillPoints[skillName].points

    let updatedSkillPoints = { ...updatedCharacter.skillPoints }
    // Set the points spent manually for the specific skill
    updatedSkillPoints[skillName].points = currentPoints + delta
    // Calculate the total skill value
    updatedSkillPoints[skillName].total = updatedSkillPoints[skillName].points + updatedSkillPoints[skillName].modifier
    updatedCharacter.skillPoints = updatedSkillPoints

    setCharacters(list => list.map((obj) => obj.id === id ? updatedCharacter : obj))
  }

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        createCharacter,
        updateAttribute,
        updateSkillPoints,
        getCharacters,
        saveCharacters
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
};

export default CharacterContextProvider;