import axios from 'axios';

const url = 'http://localhost:3001/persons';

export async function fetchAll() {
  const response = await axios.get(url);
  return response.data;
}

export async function create(newPerson) {
  const response = await axios.post('http://localhost:3001/persons', newPerson);
  return response;
}
