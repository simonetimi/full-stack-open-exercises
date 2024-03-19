import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import axios from 'axios';
import { Login } from './components/Login';
import Toggable from './components/Toggable';
import NewBlog from './components/NewBlog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState();
  const [userDet, setUserDet] = useState({
    name: 'default',
    username: 'default',
  });

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const sessionToken = JSON.parse(storedToken);
        const details = localStorage.getItem('userDetails');
        const parsedDetails = JSON.parse(details);
        setUserDet(parsedDetails);
        setToken(sessionToken);
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
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });
      const sessionToken = response.data.token;
      setToken(sessionToken);
      setUserDet({
        name: response.data.name,
        username: response.data.username,
        id: response.data.id,
      });
      localStorage.setItem('token', JSON.stringify(sessionToken));
      localStorage.setItem(
        'userDetails',
        JSON.stringify({
          name: response.data.name,
          username: response.data.username,
          id: response.data.id,
        }),
      );
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }
  };

  const handleOnSort = () => {
    const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
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

  return (
    <>
      {message !== '' ? (
        <div className="message">
          <p>{message}</p>
        </div>
      ) : null}
      {token ? (
        <div style={{ margin: '4px' }}>
          <p>{userDet.name} logged in</p>
          <button type="text" onClick={handleOnLogout}>
            logout
          </button>
          <h2>Blogs</h2>
          <button onClick={handleOnSort}>sort by likes</button>
          {blogs.map((blog) => (
            <Blog
              username={userDet.username}
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              token={token}
              setMessage={setMessage}
            />
          ))}
          <div style={{ marginTop: '20px' }}>
            <Toggable buttonLabel={'add new blog'}>
              <NewBlog
                userId={userDet.id}
                token={token}
                setMessage={setMessage}
                setBlogs={setBlogs}
                blogs={blogs}
              />
            </Toggable>
          </div>
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
