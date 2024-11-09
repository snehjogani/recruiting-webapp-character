import { useState } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST } from "../consts";
import { Attributes, Character, Class } from "../types";
import { checkClassEligibility } from "../utils";

const ClassList = ({ character }: { character: Character }) => {
  const [selectedClass, setSelectedClass] = useState<Record<string, Attributes> | null>(null)

  return (
    <div>
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map((value: Class, index) =>
        <div key={index} onClick={() => setSelectedClass({ [value]: CLASS_LIST[value] })}>
          <h4 style={{ color: checkClassEligibility(character.attributes, CLASS_LIST[value]) ? "green" : undefined }}>{value}</h4>
        </div>
      )}
      {!!selectedClass && <div style={{}}>
        <h2>{`${Object.keys(selectedClass)[0]} Class`}<br />Minimum Requirements</h2>
        <div>
          {ATTRIBUTE_LIST.map((attribute, index) => <p key={index}>{`${attribute}: ${Object.values(selectedClass)[0][attribute]}`}</p>)}
        </div>
        <button onClick={() => setSelectedClass(null)}>Close Requirements</button>
      </div>}
    </div>
  );
};

export default ClassList