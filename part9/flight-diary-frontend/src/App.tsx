import { useEffect, useState } from 'react';
import { DiaryEntry, DiaryEntryNoId, Weather, Visibility } from './types';
import { getEntries, addEntry } from './utils/connect';
import axios from 'axios';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<DiaryEntryNoId>({
    date: '',
    weather: '',
    visibility: '',
    comment: '',
  });
  const [notification, setNotification] = useState('');

  useEffect(() => {
    (async function () {
      const fetchedData = await getEntries();
      setEntries(fetchedData);
    })();
  }, []);

  const onEntrySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await addEntry(newEntry);
      setEntries([...entries, response.data]);
      addEntry({
        date: '',
        weather: '',
        visibility: '',
        comment: '',
      });
      setNotification(response.statusText);
      setTimeout(() => setNotification(''), 3500);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setNotification(err.response.data);
        setTimeout(() => setNotification(''), 3500);
      } else {
        console.log(err);
      }
    }
  };

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const entryToAdd = { ...newEntry, date: event.target.value };
    setNewEntry(entryToAdd);
  };

  const onChangeVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    const entryToAdd = { ...newEntry, visibility: event.target.value };
    setNewEntry(entryToAdd);
  };

  const onChangeWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
    const entryToAdd = { ...newEntry, weather: event.target.value };
    setNewEntry(entryToAdd);
  };

  const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const entryToAdd = { ...newEntry, comment: event.target.value };
    setNewEntry(entryToAdd);
  };

  return (
    <div>
      {notification === '' ? null : <p>Notification: {notification}</p>}
      <section>
        <form onSubmit={onEntrySubmit}>
          <label>
            Date:
            <input name="date" type="date" onChange={onChangeDate} />
          </label>
          <section id="visibility">
            <label>
              Sunny
              <input
                type="radio"
                value={Visibility.Great}
                checked={newEntry.visibility === Visibility.Great}
                onChange={onChangeVisibility}
              />
            </label>
            <label>
              Rainy
              <input
                type="radio"
                value={Visibility.Good}
                checked={newEntry.visibility === Visibility.Good}
                onChange={onChangeVisibility}
              />
            </label>
            <label>
              Cloudy
              <input
                type="radio"
                value={Visibility.Ok}
                checked={newEntry.visibility === Visibility.Ok}
                onChange={onChangeVisibility}
              />
            </label>
            <label>
              Stormy
              <input
                type="radio"
                value={Visibility.Poor}
                checked={newEntry.visibility === Visibility.Poor}
                onChange={onChangeVisibility}
              />
            </label>
          </section>
          <section id="weather">
            <label>
              Sunny
              <input
                type="radio"
                value={Weather.Sunny}
                checked={newEntry.weather === Weather.Sunny}
                onChange={onChangeWeather}
              />
            </label>
            <label>
              Rainy
              <input
                type="radio"
                value={Weather.Rainy}
                checked={newEntry.weather === Weather.Rainy}
                onChange={onChangeWeather}
              />
            </label>
            <label>
              Cloudy
              <input
                type="radio"
                value={Weather.Cloudy}
                checked={newEntry.weather === Weather.Cloudy}
                onChange={onChangeWeather}
              />
            </label>
            <label>
              Stormy
              <input
                type="radio"
                value={Weather.Stormy}
                checked={newEntry.weather === Weather.Stormy}
                onChange={onChangeWeather}
              />
            </label>
            <label>
              Windy
              <input
                type="radio"
                value={Weather.Windy}
                checked={newEntry.weather === Weather.Windy}
                onChange={onChangeWeather}
              />
            </label>
          </section>
          <label>
            Comment:
            <input name="comment" onChange={onChangeComment} />
          </label>
          <button type="submit">Add</button>
        </form>
      </section>
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
