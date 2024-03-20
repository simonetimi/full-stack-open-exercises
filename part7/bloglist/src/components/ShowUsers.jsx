const ShowUsers = ({ username, blogLength }) => {
  return (
    <>
      <p style={{ gridColumn: '1 / 2' }}>{username}</p>
      <p style={{ gridColumn: '2 / 3' }}>{blogLength}</p>
    </>
  );
};

export default ShowUsers;
