import axios from 'axios';

const url = 'http://localhost:3001/persons';

export async function fetchAll() {
  const response = await axios.get(url);
  return response.data;
}

export async function createOnDb(newPerson) {
  return await axios.post(url, newPerson);
}

export async function removeFromDb(personId) {
  return await axios.delete(`${url}/${personId}`);
}
