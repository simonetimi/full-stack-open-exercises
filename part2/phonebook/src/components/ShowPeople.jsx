export const ShowPeople = ({ searchInput, persons, found }) => {
  return searchInput === ''
    ? persons.map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      ))
    : found.map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      ));
};
