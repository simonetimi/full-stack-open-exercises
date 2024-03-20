import { Link } from 'react-router-dom';

const ShowUsers = ({ username, blogLength, userId }) => {
  return (
    <>
      <p style={{ gridColumn: '1 / 2' }}>
        <Link to={`/users/${userId}`}>{username}</Link>
      </p>
      <p style={{ gridColumn: '2 / 3' }}>{blogLength}</p>
    </>
  );
};

export default ShowUsers;
