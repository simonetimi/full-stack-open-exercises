import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  // the use ref avoids first render (empty)
  const isInitialRender = useRef(true);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await axios.get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
      );
      setCountry(response.data);
    };
    if (!isInitialRender.current) {
      fetchCountry();
    } else {
      isInitialRender.current = false;
    }
    // the dependency "name" will run the effect when there's a change in name
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.name.common) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flags.png} height="100" alt={`flag of ${country.name.common}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
