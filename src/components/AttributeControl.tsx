const AttributeControl = ({ name, value, onIncrease, onDecrease }) => {
  return (
    <div style={{marginBottom: "4px"}}>
      <p style={{ display: 'inline' }}>{name}: {value} (Modifier: 0) </p>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
};

export default AttributeControl;
