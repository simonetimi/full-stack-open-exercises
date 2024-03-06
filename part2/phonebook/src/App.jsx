import { useEffect, useState } from 'react';
import { Search } from './components/Search';
import { NewPerson } from './components/NewPerson';
import { ShowPeople } from './components/ShowPeople';
import { v4 as uuidv4 } from 'uuid';
import { fetchAll, createOnDb } from './helpers/connect';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [found, setFound] = useState('');

  useEffect(() => {
    (async () => {
      const data = await fetchAll();
      setPersons(data);
    })();
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
    await createOnDb(newPerson);
    setPersons([...persons, newPerson]);
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
      <ShowPeople
        searchInput={searchInput}
        persons={persons}
        found={found}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
