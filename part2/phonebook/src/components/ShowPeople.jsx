import { removeFromDb } from '../helpers/connect';

const DeleteButton = ({ personId, setPersons, persons }) => {
  const handleOnClick = async () => {
    if (confirm('Do you really want to delete the entry?')) {
      await removeFromDb(personId);
      const indexToRemove = persons.findIndex((item) => item.id === personId);
      setPersons(persons.toSpliced(indexToRemove));
    }
  };

  return <button onClick={handleOnClick}>delete</button>;
};

export const ShowPeople = ({ searchInput, persons, found, setPersons }) => {
  return searchInput === ''
    ? persons.map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}{' '}
          <DeleteButton personId={person.id} persons={persons} setPersons={setPersons} />
        </li>
      ))
    : found.map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      ));
};
