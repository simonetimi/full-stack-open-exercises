import axios from 'axios';

const url = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0);
  const object = { content, id: getId(), votes: 0 };
  const response = await axios.post(url, object);
  return response.data;
};

const updateOne = async (id) => {
  const anecdotes = await getAll();
  const object = anecdotes.filter((anecdote) => anecdote.id === id);
  object[0].votes += 1;
  const response = await axios.put(`${url}/${id}`, object[0]);
  return response.data;
};

export { createNew, getAll, updateOne };
