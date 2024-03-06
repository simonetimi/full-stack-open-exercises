import { useState } from 'react';
import { Search } from './components/Search';
import { NewPerson } from './components/NewPerson';
import { ShowPeople } from './components/ShowPeople';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [found, setFound] = useState('');

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleOnChangePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleOnSubmit = (event) => {
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
    setPersons([...persons, { name: newName, number: newPhone }]);
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
