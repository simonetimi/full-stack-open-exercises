const Recommendations = ({ show, books, currentUser }) => {
  if (!show) {
    return null;
  }

  console.log(currentUser);

  return (
    <div>
      <h2>Recommanded books based on your favourite genre: {currentUser.data.me.favoriteGenre}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) =>
            book.genres.includes(currentUser.data.me.favoriteGenre) ? (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
