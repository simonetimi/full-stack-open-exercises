import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const NewBlog = ({
  token,
  setBlogs,
  setMessage,
  blogs,
  userId,
  submitForm,
}) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: userId,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleOnSubmitNewBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/blogs',
        newBlog,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setBlogs([...blogs, response.data]);
      setMessage('Blog submitted successfully');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <h2>Insert new blog</h2>
      <form
        onSubmit={
          submitForm ? () => submitForm(newBlog) : handleOnSubmitNewBlog
        }
      >
        <label>
          Title:{' '}
          <input type="text" name="title" onChange={handleOnChange}></input>
        </label>
        <label>
          Author:{' '}
          <input type="text" name="author" onChange={handleOnChange}></input>
        </label>
        <label>
          Url: <input type="text" name="url" onChange={handleOnChange}></input>
        </label>
        <button type="submit">New blog</button>
      </form>
    </>
  );
};

NewBlog.propTypes = {
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  submitForm: PropTypes.func,
};

export default NewBlog;
