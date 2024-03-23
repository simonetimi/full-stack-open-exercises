import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre || '',
    },
    fetchPolicy: 'network-only',
  });
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setGenres([...new Set(books.map((book) => book.genres).flat())]);
  }, [books, filteredBooks, setGenres]);

  const onGenreChange = async (event) => {
    setSelectedGenre(event.target.value);
  };

  if (!show) {
    return null;
  }

  if (filteredBooks.loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>books</h2>
      <h3>Genres</h3>
      <select id="genres" value={selectedGenre} onChange={onGenreChange}>
        <option value={''}>All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

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

export default Books;
