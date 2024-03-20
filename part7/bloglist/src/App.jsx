import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, postBlog, updateBlog, deleteBlog } from './services/blogs';
import { getAllUsers } from './services/users';
import axios from 'axios';
import { Login } from './components/Login';
import Toggable from './components/Toggable';
import NewBlog from './components/NewBlog';
import { Notification } from './components/Notification';
import ShowUsers from './components/ShowUsers';
import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';
import { UserContext } from './hooks/UserContext';
import { useQueryClient, useQuery, useMutation } from 'react-query';

const App = () => {
  const { userState, dispatchUser } = useContext(UserContext);
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

  const queryClient = useQueryClient();
  const query = useQuery('blogs', getAll);
  const queryUsers = useQuery('users', getAllUsers);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userDetails = JSON.parse(savedUser);
        dispatchUser({ type: 'set_user', payload: userDetails });
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
      const responseUser = {
        name: response.data.name,
        username: response.data.username,
        id: response.data.id,
        token: response.data.token,
      };
      dispatchUser({ type: 'set_user', payload: responseUser });
      localStorage.setItem('user', JSON.stringify(responseUser));
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
    dispatchUser({ type: 'clear_user' });
    location.reload();
  };

  if (!query.data || !queryUsers.data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Notification />
      {userState.token ? (
        <div style={{ margin: '4px' }}>
          <p>{userState.name} logged in</p>
          <button type="text" onClick={handleOnLogout}>
            logout
          </button>
          <h2>Blogs</h2>
          <button onClick={handleOnSort}>sort by likes</button>
          {query.data.map((blog) => (
            <Blog
              username={userState.username}
              key={blog.id}
              blog={blog}
              updateBlogMutation={updateBlogMutation}
              deleteBlogMutation={deleteBlogMutation}
              blogs={query.data}
              token={userState.token}
            />
          ))}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 50px',
              gridTemplateRows: '50px auto',
            }}
          >
            <h2 style={{ gridColumn: '1 / 3' }}>Users</h2>
            <p style={{ gridColumn: '2 / 3' }}>Blogs: </p>
            {queryUsers.data.map((user) => (
              <ShowUsers
                username={user.username}
                key={user.id}
                blogLength={user.blogs.length}
              />
            ))}
          </section>
          <div style={{ marginTop: '20px' }}>
            <Toggable buttonLabel={'add new blog'}>
              <NewBlog
                userId={userState.id}
                token={userState.token}
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
