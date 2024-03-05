import { useState } from 'react';

const CountButton = ({ value, setValue, label }) => {
  const handleOnClick = () => {
    setValue(value + 1);
  };
  return (
    <button type="button" onClick={handleOnClick}>
      {label}
    </button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const labels = ['good', 'neutral', 'bad'];

  return (
    <div>
      <h1>give feedback</h1>
      <CountButton value={good} setValue={setGood} label={labels[0]} />
      <CountButton value={neutral} setValue={setNeutral} label={labels[1]} />
      <CountButton value={bad} setValue={setBad} label={labels[2]} />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
