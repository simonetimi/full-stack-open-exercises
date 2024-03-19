import { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlog = ({ token, addBlogMutation, userId, submitForm }) => {
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
    addBlogMutation.mutate({
      newBlog,
      token,
    });
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
  submitForm: PropTypes.func,
};

export default NewBlog;
