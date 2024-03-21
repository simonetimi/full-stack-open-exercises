import { Link } from 'react-router-dom';
import { Chip } from '@nextui-org/react';

const ShowUsers = ({ username, blogLength, userId }) => {
  return (
    <div className="flex flex-col gap-1 w-20">
      <Link to={`/users/${userId}`}>
        <Chip>{username}</Chip>
      </Link>
      <p className="text-sm text-slate-500">Blogs: {blogLength}</p>
    </div>
  );
};

export default ShowUsers;
