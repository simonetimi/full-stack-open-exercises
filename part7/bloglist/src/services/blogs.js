import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs';

export const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
export const postBlog = async (data) => {
  const response = await axios.post(
    'http://localhost:3001/api/blogs',
    data.newBlog,
    {
      headers: { Authorization: `Bearer ${data.token}` },
    },
  );
  return response.data;
};

export const updateBlog = async (data) => {
  const response = await axios.put(
    `http://localhost:3001/api/blogs/${data.updatedBlog.id}`,
    data.updatedBlog,
    {
      headers: { Authorization: `Bearer ${data.token}` },
    },
  );
  return response.data;
};

export const deleteBlog = async (data) => {
  const response = await axios.delete(
    `http://localhost:3001/api/blogs/${data.blog.id}`,
    {
      headers: { Authorization: `Bearer ${data.token}` },
    },
  );
  return response.data;
};
