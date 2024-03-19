import Togglable from './Toggable';

const style = {
  padding: '4px',
  margin: '4px',
  border: '1px solid black',
  borderRadius: '12px',
};

const Blog = ({
  blog,
  token,
  username,
  updateBlogMutation,
  deleteBlogMutation,
}) => {
  const handleOnUpdateLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate({ updatedBlog, token });
  };

  const handleOnDelete = async () => {
    if (!window.confirm('Are you sure you wanna delete the blog entry?')) {
      return;
    }
    deleteBlogMutation.mutate({ blog, token });
  };

  return (
    <div style={style} className="blog">
      {blog.title}
      <Togglable buttonLabel={'Show more'}>
        <p>Author: {blog.author}</p>
        {blog.url ? <p id="url">Blog url: {blog.url}</p> : null}
        {blog.likes > 0 ? <p id="likes">Likes: {blog.likes}</p> : null}{' '}
        <button onClick={handleOnUpdateLikes}>like</button>
        <p>Added by: {blog.user.username}</p>
        {username === blog.user.username ? (
          <button
            onClick={handleOnDelete}
            style={{
              backgroundColor: 'red',
              borderRadius: '6px',
              color: 'white',
            }}
          >
            delete
          </button>
        ) : null}
      </Togglable>
    </div>
  );
};

export default Blog;
