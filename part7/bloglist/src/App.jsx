import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import {
  getAll,
  postBlog,
  updateBlog,
  deleteBlog,
  postComment,
} from './services/blogs';
import { getAllUsers } from './services/users';
import axios from 'axios';
import { Login } from './components/Login';
import Toggable from './components/Toggable';
import NewBlog from './components/NewBlog';
import UserDet from './components/UserDet';
import { Notification } from './components/Notification';
import ShowUsers from './components/ShowUsers';
import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';
import { UserContext } from './hooks/UserContext';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';

const App = () => {
  const { userState, dispatchUser } = useContext(UserContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  const addCommentMutation = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      dispatchNotification({
        type: 'set_message',
        payload: 'Comment added!',
      });
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
    <Router>
      <Notification />
      {userState.token ? (
        <>
          <Navbar isBordered className="w-screen">
            <NavbarContent justify="start"></NavbarContent>
            <NavbarContent justify="center">
              <NavbarItem>
                <Link style={{ padding: '10px' }} to="/">
                  Blogs
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link style={{ padding: '10px' }} to="/users">
                  Users
                </Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <Chip color="primary">{userState.name} logged in</Chip>
              <Button type="text" onClick={handleOnLogout} className="h-6">
                logout
              </Button>
            </NavbarContent>
          </Navbar>
          <div className="m-4 flex flex-col gap-4 w-1/2">
            <Routes>
              <Route
                path="/blogs/:id"
                element={
                  <Blog
                    blogs={query.data}
                    username={userState.username}
                    updateBlogMutation={updateBlogMutation}
                    deleteBlogMutation={deleteBlogMutation}
                    addCommentMutation={addCommentMutation}
                    token={userState.token}
                  />
                }
              />
              <Route
                path="/users/:id"
                element={<UserDet users={queryUsers.data} />}
              />
              <Route
                path="/"
                element={
                  <>
                    <h2 className="text-2xl underline text-center">Blogs</h2>
                    <Button onClick={handleOnSort} className="h-6 w-24">
                      sort by likes
                    </Button>
                    <ul className="flex flex-col gap-2">
                      {query.data.map((blog) => (
                        <Link key={blog.id} to={`/blogs/${blog.id}`}>
                          <li className="border-1 rounded-md p-2 hover:transition-transform hover:scale-105">
                            {blog.title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                    <div style={{ marginTop: '20px' }}>
                      <>
                        <Button onPress={onOpen}>Add New Blog</Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalHeader className="flex flex-col gap-1">
                                  Add New Blog
                                </ModalHeader>
                                <ModalBody>
                                  <NewBlog
                                    userId={userState.id}
                                    token={userState.token}
                                    addBlogMutation={addBlogMutation}
                                    deleteBlogMutation={deleteBlogMutation}
                                    onClose={onClose}
                                  />
                                </ModalBody>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      </>
                    </div>
                  </>
                }
              />
              <Route
                path="/users"
                element={
                  <section className="border-1 rounded-md p-3 gap-5">
                    <h2 className="text-2xl mb-5">Users</h2>
                    <div className="flex flex-wrap p-2 gap-2">
                      {queryUsers.data.map((user) => (
                        <ShowUsers
                          username={user.username}
                          userId={user._id}
                          key={user._id}
                          blogLength={user.blogs.length}
                        />
                      ))}
                    </div>
                  </section>
                }
              />
            </Routes>
          </div>
        </>
      ) : (
        <Login
          username={username}
          password={password}
          handleOnChangeUsername={handleOnChangeUsername}
          handleOnChangePassword={handleOnChangePassword}
          handleOnLogin={handleOnLogin}
        />
      )}
    </Router>
  );
};

export default App;
