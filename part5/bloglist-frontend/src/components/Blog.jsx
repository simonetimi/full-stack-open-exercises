import Togglable from './Toggable';
import axios from 'axios';

const style = {
  padding: '4px',
  margin: '4px',
  border: '1px solid black',
  borderRadius: '12px',
};

const Blog = ({ blog, blogs, setBlogs, token, setMessage, username, updateLikes }) => {
  const handleOnUpdateLikes = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 };
      await axios.put(`http://localhost:3001/api/blogs/${blog.id}`, newBlog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blogToUpdateIndex = blogs.findIndex((obj) => obj.id === newBlog.id);
      const newBlogs = [...blogs];
      newBlogs[blogToUpdateIndex] = newBlog;
      setBlogs(newBlogs);
      blog.likes += 1;
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  const handleOnDelete = async () => {
    if (!window.confirm('Are you sure you wanna delete the blog entry?')) {
      return;
    }
    await axios.delete(`http://localhost:3001/api/blogs/${blog.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const blogToDeleteIndex = blogs.findIndex((obj) => obj.id === blog.id);
    const newBlogs = blogs.toSpliced(blogToDeleteIndex, 1);
    setBlogs(newBlogs);
  };

  return (
    <div style={style}>
      {blog.title}
      <Togglable buttonLabel={'Show more'}>
        <p>Author: {blog.author}</p>
        {blog.url ? <p id="url">Blog url: {blog.url}</p> : null}
        {blog.likes > 0 ? <p id="likes">Likes: {blog.likes}</p> : null}{' '}
        <button onClick={updateLikes || handleOnUpdateLikes}>like</button>
        <p>Added by: {blog.user.username}</p>
        {username === blog.user.username ? (
          <button
            onClick={handleOnDelete}
            style={{ backgroundColor: 'red', borderRadius: '6px', color: 'white' }}
          >
            delete
          </button>
        ) : null}
      </Togglable>
    </div>
  );
};

export default Blog;
