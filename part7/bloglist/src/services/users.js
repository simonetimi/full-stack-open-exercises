import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users';

export const getAllUsers = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
