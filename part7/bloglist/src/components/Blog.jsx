import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { Button, Input, Divider } from '@nextui-org/react';

const style = {
  padding: '4px',
  margin: '4px',
  border: '1px solid black',
  borderRadius: '12px',
};

const Blog = ({
  blogs,
  token,
  username,
  updateBlogMutation,
  deleteBlogMutation,
  addCommentMutation,
}) => {
  const commentRef = useRef(null);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  const handleOnUpdateLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate({ updatedBlog, token });
  };

  const handleOnAddComment = (event) => {
    event.preventDefault();
    const comment = commentRef.current.value;
    addCommentMutation.mutate({ comment, id });
  };

  const handleOnDelete = async () => {
    if (!window.confirm('Are you sure you wanna delete the blog entry?')) {
      return;
    }
    deleteBlogMutation.mutate({ blog, token });
  };

  return (
    <div style={style} className="blog border-1 flex flex-col gap-2">
      <h1 className="text-2xl">{blog.title}</h1>
      <p className="text-xl">Author: {blog.author}</p>
      {blog.url ? <p id="url">Blog url: {blog.url}</p> : null}
      {blog.likes > 0 ? <p id="likes">Likes: {blog.likes}</p> : null}{' '}
      <Button
        onClick={handleOnUpdateLikes}
        color="primary"
        className="w-10 h-6"
      >
        like
      </Button>
      <p className="text-slate-500">Added by: {blog.user.username}</p>
      {username === blog.user.username ? (
        <Button onClick={handleOnDelete} color="danger" className="w-10 h-10">
          delete
        </Button>
      ) : null}
      <h2 className="text-xl mt-6">Comments</h2>
      <form onSubmit={handleOnAddComment}>
        <Input
          ref={commentRef}
          type="text"
          minLength={1}
          isRequired
          className="w-2/3"
        />
        <Button type="submit" className="w-8 h-8 mt-3" color="primary">
          Add
        </Button>
      </form>
      {blog.comments.length > 0 ? (
        <ul id="comments">
          <h3 className="text-lg">Last comments:</h3>
          {blog.comments.map((comment, index) => (
            <li className="p-1 border-1 rounded-md my-2" key={index}>
              {comment}
            </li>
          ))}
        </ul>
      ) : null}{' '}
    </div>
  );
};

export default Blog;
