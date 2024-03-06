import { useEffect, useState } from 'react';
import { Search } from './components/Search';
import { NewPerson } from './components/NewPerson';
import { ShowPeople } from './components/ShowPeople';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [found, setFound] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3001/persons');
      setPersons(response.data);
    }
    fetchData();
  }, []);

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleOnChangePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const nameIsPresent = persons.find((person) => person.name === newName) !== undefined;
    const phoneIsPresent = persons.find((person) => person.number === newPhone) !== undefined;
    if (nameIsPresent) {
      alert(`${newName} is already present.`);
      return;
    } else if (phoneIsPresent) {
      alert(`Phone number: ${newPhone} is already present.`);
      return;
    }
    const newPerson = { name: newName, number: newPhone, id: uuidv4() };
    setPersons([...persons, { name: newName, number: newPhone, id: uuidv4() }]);
    const response = await axios.post('http://localhost:3001/persons', newPerson);
    console.log(response);
  };

  const handleOnChangeSearch = (event) => {
    const search = event.target.value;
    setSearchInput(search);
    setFound(persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase())));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleOnChangeSearch={handleOnChangeSearch} searchInput={searchInput} />
      <hr />
      <NewPerson
        newName={newName}
        handleOnChangeName={handleOnChangeName}
        newPhone={newPhone}
        handleOnChangePhone={handleOnChangePhone}
        handleOnSubmit={handleOnSubmit}
      />

      <h2>Numbers</h2>
      <ShowPeople searchInput={searchInput} persons={persons} found={found} />
    </div>
  );
};

export default App;
