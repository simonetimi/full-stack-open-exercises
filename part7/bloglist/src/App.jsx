import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, postBlog, updateBlog, deleteBlog } from './services/blogs';
import axios from 'axios';
import { Login } from './components/Login';
import Toggable from './components/Toggable';
import NewBlog from './components/NewBlog';
import { Notification } from './components/Notification';
import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';
import { useQueryClient, useQuery, useMutation } from 'react-query';

const App = () => {
  const { dispatchNotification } = useContext(NotificationContext);
  const addBlogMutation = useMutation(postBlog, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs');
      dispatchNotification({
        type: 'set_message',
        payload: 'Blog submitted successfully',
      });
      setTimeout(() => {
        dispatchNotification({
          type: 'clear',
        });
      }, 3000);
    },
    onError: (err) => {
      dispatchNotification({ type: 'set_message', payload: err });
      setTimeout(() => {
        dispatchNotification({
          type: 'clear',
        });
      }, 3000);
    },
  });
  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      dispatchNotification({
        type: 'set_message',
        payload: 'Blog deleted successfully',
      });
      setTimeout(() => {
        dispatchNotification({
          type: 'clear',
        });
      }, 3000);
    },
  });
  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs');
      // check notification here, it doesn't work
      dispatchNotification({
        type: 'set_message',
        payload: `You liked: ${data.title}`,
      });
      setTimeout(() => {
        dispatchNotification({
          type: 'clear',
        });
      }, 3000);
    },
    onError: (err) => {
      dispatchNotification({ type: 'set_message', payload: err });
      setTimeout(() => {
        dispatchNotification({
          type: 'clear',
        });
      }, 3000);
    },
  });
  const sortBlogsMutation = useMutation((sortedBlogs) => {
    queryClient.setQueryData('blogs', sortedBlogs);
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  const [userDet, setUserDet] = useState({
    name: 'default',
    username: 'default',
  });

  const queryClient = useQueryClient();
  const query = useQuery('blogs', getAll);

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
    } catch (error) {
      dispatchNotification({
        type: 'set_message',
        payload: error.message,
      });
      dispatchNotification({
        type: 'clear',
      });
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
      dispatchNotification({
        type: 'set_message',
        payload: error.message,
      });
      dispatchNotification({
        type: 'clear',
      });
      return;
    }
  };

  const handleOnSort = () => {
    const sortedBlogs = query.data.toSorted((a, b) => b.likes - a.likes);
    sortBlogsMutation.mutate(sortedBlogs);
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

  if (!query.data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Notification />
      {token ? (
        <div style={{ margin: '4px' }}>
          <p>{userDet.name} logged in</p>
          <button type="text" onClick={handleOnLogout}>
            logout
          </button>
          <h2>Blogs</h2>
          <button onClick={handleOnSort}>sort by likes</button>
          {query.data.map((blog) => (
            <Blog
              username={userDet.username}
              key={blog.id}
              blog={blog}
              updateBlogMutation={updateBlogMutation}
              deleteBlogMutation={deleteBlogMutation}
              blogs={query.data}
              token={token}
            />
          ))}
          <div style={{ marginTop: '20px' }}>
            <Toggable buttonLabel={'add new blog'}>
              <NewBlog
                userId={userDet.id}
                token={token}
                addBlogMutation={addBlogMutation}
                deleteBlogMutation={deleteBlogMutation}
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
