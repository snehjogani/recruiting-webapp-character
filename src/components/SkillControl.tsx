const SkillControl = ({ skill, values, onIncrease, onDecrease }) => {
  return (
    <div>
      <p style={{ display: "inline" }}>{skill.name}: {values.points || 0} </p>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <p style={{ display: "inline" }}> Modifier ({skill.attributeModifier}): {values.modifier}</p>
      <h4 style={{ display: "inline" }}> Total: {values.total} </h4>
    </div>
  );
};

export default SkillControl;
