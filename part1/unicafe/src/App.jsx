import { useState } from 'react';
import { Statistics } from './Statistics';
import { Button } from './Button';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;

  const labels = ['good', 'neutral', 'bad'];

  return (
    <div>
      <h1>give feedback</h1>
      <Button value={good} setValue={setGood} label={labels[0]} />
      <Button value={neutral} setValue={setNeutral} label={labels[1]} />
      <Button value={bad} setValue={setBad} label={labels[2]} />
      <Statistics all={all} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
