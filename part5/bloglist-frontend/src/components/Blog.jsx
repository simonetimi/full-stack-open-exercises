import Togglable from './Toggable';
import axios from 'axios';

const style = {
  padding: '4px',
  margin: '4px',
  border: '1px solid black',
  borderRadius: '12px',
};

const Blog = ({ blog, blogs, setBlogs, token, setMessage }) => {
  const handleOnUpdateLikes = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 };
      await axios.put(`http://localhost:3001/api/blogs/${blog.id}`, newBlog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs([...blogs, newBlog]);
      blog.likes += 1;
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={style}>
      {blog.title}
      <Togglable buttonLabel={'Show more'}>
        <p>Author: {blog.author}</p>
        <p>Blog url: {blog.url}</p>
        <p>
          Likes: {blog.likes} <button onClick={handleOnUpdateLikes}>like</button>
        </p>
      </Togglable>
    </div>
  );
};

export default Blog;
