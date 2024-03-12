import { useState } from 'react';
import axios from 'axios';

const NewBlog = ({ token, setBlogs, setMessage, blogs }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const handeOnChangeTitle = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const handeOnChangeAuthor = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };

  const handeOnChangeUrl = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  const handleOnSubmitNewBlog = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/blogs', newBlog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs([...blogs, newBlog]);
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
      <form>
        <label>
          Title: <input type="text" onChange={handeOnChangeTitle}></input>
        </label>
        <label>
          Author: <input type="text" onChange={handeOnChangeAuthor}></input>
        </label>
        <label>
          Url: <input type="text" onChange={handeOnChangeUrl}></input>
          <button type="submit" onClick={handleOnSubmitNewBlog}>
            New blog
          </button>
        </label>
      </form>
    </>
  );
};

export default NewBlog;
