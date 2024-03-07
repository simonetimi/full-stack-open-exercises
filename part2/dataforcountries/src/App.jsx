import { useEffect, useState } from 'react';
import axios from 'axios';
import getWeather from './helpers/weather';

const CountryItem = ({ country }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li>
      {country.name.common}{' '}
      <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'hide' : 'show'}</button>
      {isVisible && (
        <div>
          {' '}
          <h2>
            {country.name.common} {country.flag}
          </h2>
          <p>Continent: {country.continents[0]}</p>
          <p>Capital: {country.capital[0]}</p>
          <p>Languages: {Object.values(country.languages).map((language) => language)}</p>
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
      )}
    </li>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [foundCountries, setFoundCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    async function fetchAll() {
      const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
      setCountries(response.data);
      setIsLoading(false);
    }
    fetchAll();
  }, []);

  const handleOnChangeSearch = async (event) => {
    const searchedName = event.target.value;
    setSearchInput(searchedName);
    const found = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchedName.toLowerCase())
    );
    setFoundCountries(found);
  };

  useEffect(() => {
    async function fetchWeather() {
      if (foundCountries.length === 1) {
        const data = await getWeather(foundCountries[0].capital);
        setWeather(data);
      }
    }
    fetchWeather();
  }, [foundCountries]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <label htmlFor="searchCountry">
        search country:{' '}
        <input id="searchCountry" onChange={handleOnChangeSearch} value={searchInput} />
      </label>
      {foundCountries.length > 10 ? (
        <p>Too many countries found, please restrict your search</p>
      ) : foundCountries.length > 1 ? (
        foundCountries.map((country) => <CountryItem key={country.name.common} country={country} />)
      ) : foundCountries.length === 1 ? (
        foundCountries.map((country) => (
          <div key={country.name.common}>
            <h2>
              {country.name.common} {country.flag}
            </h2>
            <p>Continent: {country.continents[0]}</p>
            <p>Capital: {country.capital[0]}</p>
            <p>Languages: {Object.values(country.languages).map((language) => language)}</p>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h2>{country.capital[0]} current weather</h2>
            <img src={weather.weatherIcon} alt={weather.weatherDescription} />
            <p>{weather.weatherDescription}</p>
            <p>Temperature: {weather.temp}°C</p>
            <p>Wind speed: {weather.windSpeed} km/h</p>
            <p>Precipitation: {weather.precipitation}%</p>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default App;
