import { useState } from 'react';
import { SkillPoints } from '../types';
import { SKILL_LIST } from '../consts';

const SkillCheck = ({ skillPoints }: { skillPoints: SkillPoints }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name)
  const [DC, setDC] = useState(10)
  const [result, setResult] = useState(null)

  const handleRoll = () => {
    // Total skill value of character
    const skillPointTotal = skillPoints[selectedSkill].total
    // Random roll from 1 to 20
    const roll = Math.floor(Math.random() * 20) + 1
    const total = roll + skillPointTotal

    setResult({ roll, success: total >= DC, total })
  }

  return (
    <div>
      <h2>Skill Check</h2>
      <select onChange={(e) => setSelectedSkill(e.target.value)} value={selectedSkill}>
        {SKILL_LIST.map((skill) => <option key={skill.name} value={skill.name}>{skill.name}</option>)}
      </select>
      <input
        type="number"
        min="1"
        value={DC}
        onChange={(e) => setDC(parseInt(e.target.value))}
      />
      <button onClick={handleRoll}>Roll</button>

      {result && <div>
        <p>Roll: {result.roll}</p>
        <p>Total: {result.total}</p>
        <p>{result.success ? 'Success' : 'Failure'}</p>
      </div>
      }
    </div>
  );
};

export default SkillCheck;
