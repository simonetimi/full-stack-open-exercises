import { useParams } from 'react-router-dom';
import { Chip } from '@nextui-org/react';

const UserDet = ({ users }) => {
  const id = useParams().id;

  const user = users.find((user) => user._id === id);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <Chip className="text-xl">{user.username}</Chip>
      <h2 className="text-lg underline">Blogs:</h2>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li className="border-1 my-2 rounded-md w-1/2 p-2" key={blog.id}>
              {blog.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserDet;
