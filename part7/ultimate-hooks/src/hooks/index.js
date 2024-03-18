import { useState } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  };

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      getAll();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const service = {
    create,
    getAll,
  };

  return [resources, service];
};
