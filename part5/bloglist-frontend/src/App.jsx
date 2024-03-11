import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import axios from 'axios';
import { Login } from './components/Login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState();
  const [userDet, setUserDet] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const sessionToken = JSON.parse(storedToken);
        const name = localStorage.getItem('userDetails');
        setToken(sessionToken);
        setUserDet(name);
      }
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }
  }, []);

  const handleOnLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/login`, {
        username,
        password,
      });
      const sessionToken = response.data.token;
      setToken(sessionToken);
      setUserDet(response.data.name);
      localStorage.setItem('token', JSON.stringify(sessionToken));
      localStorage.setItem('userDetails', JSON.stringify(response.data.name));
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }
  };

  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnLogout = () => {
    localStorage.clear();
    location.reload();
  };

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
      const response = await axios.post('http://localhost:3001/api/blogs', newBlog, {
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
      {message !== '' ? (
        <div className="message">
          <p>{message}</p>
        </div>
      ) : null}
      {token ? (
        <div>
          <p>{userDet} logged in</p>
          <button type="text" onClick={handleOnLogout}>
            logout
          </button>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
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
        </div>
      ) : (
        <Login
          username={username}
          password={password}
          handleOnChangeUsername={handleOnChangeUsername}
          handleOnChangePassword={handleOnChangePassword}
          handleOnLogin={handleOnLogin}
        />
      )}
    </>
  );
};

export default App;
