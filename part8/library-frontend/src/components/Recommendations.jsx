import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Recommendations = ({ show, currentUser }) => {
  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: {
      genre: currentUser.data.me.favoriteGenre || '',
    },
  });

  if (!show) {
    return null;
  }

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
          {filteredBooks.data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
