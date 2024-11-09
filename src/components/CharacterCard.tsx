import { useContext } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import { Attribute, Character } from '../types';
import { ATTRIBUTE_LIST } from '../consts';
import AttributeControl from './AttributeControl';
import ClassList from './ClassList';

const CharacterCard = ({ character }: { character: Character }) => {
  const { updateAttribute } = useContext(CharacterContext)

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
      </div>
    </div>
  );
};

export default CharacterCard;
