import Togglable from './Toggable';

const style = {
  padding: '4px',
  margin: '4px',
  border: '1px solid black',
  borderRadius: '12px',
};

const Blog = ({ blog }) => (
  <div style={style}>
    {blog.title}
    <Togglable buttonLabel={'Show more'}>
      <p>Author: {blog.author}</p>
      <p>Blog url: {blog.url}</p>
      <p>
        Likes: {blog.likes} <button>like</button>
      </p>
    </Togglable>
  </div>
);

export default Blog;
