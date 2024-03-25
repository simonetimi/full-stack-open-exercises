import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getEntries } from './utils/connect';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    (async function () {
      const fetchedData = await getEntries();
      setEntries(fetchedData);
    })();
  }, []);

  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
          <p>Personal comment: {entry.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
