import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const UserDet = ({ users }) => {
  const id = useParams().id;

  const user = users.find((user) => user._id === id);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <h1>{user.username}</h1>
      <h2>blogs</h2>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </>
  );
};

export default UserDet;
