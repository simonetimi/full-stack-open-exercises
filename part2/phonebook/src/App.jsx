import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '123456789' }]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input type="text" name="name" value={newName} onChange={handleOnChangeName} />
        </div>
        <div>
          phone number:{' '}
          <input type="tel" name="phone" value={newPhone} onChange={handleOnChangePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      ))}
    </div>
  );
};

export default App;
