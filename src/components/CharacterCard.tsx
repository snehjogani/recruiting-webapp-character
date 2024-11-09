import { useContext, useMemo } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import { Attribute, Character } from '../types';
import { ATTRIBUTE_LIST, SKILL_LIST } from '../consts';
import AttributeControl from './AttributeControl';
import ClassList from './ClassList';
import SkillControl from './SkillControl';
import { calculateModifier, calculateSkillPoints, validateSkillPoints } from '../utils';

const CharacterCard = ({ character }: { character: Character }) => {
  const { updateAttribute, updateSkillPoints } = useContext(CharacterContext)

  const handleAttributeIncrease = (attribute: Attribute) => {
    if (Object.values(character.attributes).reduce((a, b) => a + b, 0) < 70) {
      updateAttribute(character.id, attribute, 1)
    } else {
      alert("A Character can have upto 70 delegated Attribute points")
    }
  }

  const handleAttributeDecrease = (attribute: Attribute) => {
    if (character.attributes[attribute] > 0) {
      updateAttribute(character.id, attribute, -1)
    }
  }

  const handleSkillPointIncrease = (skillName: string) => {
    if (validateSkillPoints(totalSkillPoints, character.skillPoints, 1)) {
      updateSkillPoints(character.id, skillName, 1)
    } else {
      alert("You cannot allocate more skill points than your total available points.")
    }
  }

  const handleSkillPointDecrease = (skillName: string) => {
    if (character.skillPoints[skillName].points > 0) {
      updateSkillPoints(character.id, skillName, -1)
    }
  }

  const totalSkillPoints = useMemo(() => {
    const intelligenceModifier = calculateModifier(character.attributes.Intelligence)
    return calculateSkillPoints(intelligenceModifier)
  }, [character.attributes.Intelligence])

  return (
    <div>
      <h2>Character: {character.id}</h2>
      <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <div style={{ flex: 1 }}>
          <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map((attribute) => (
            <AttributeControl
              key={attribute}
              name={attribute}
              value={character.attributes[attribute]}
              onIncrease={() => handleAttributeIncrease(attribute)}
              onDecrease={() => handleAttributeDecrease(attribute)}
            />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <ClassList character={character} />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Skills</h2>
          <h4>Total Available Skill Points: {totalSkillPoints}</h4>
          <div>
            {SKILL_LIST.map((skill) => (
              <SkillControl
                key={skill.name}
                skill={skill}
                values={character.skillPoints[skill.name]}
                onIncrease={() => handleSkillPointIncrease(skill.name)}
                onDecrease={() => handleSkillPointDecrease(skill.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
