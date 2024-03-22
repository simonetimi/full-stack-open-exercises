import { useEffect } from 'react';
import { useState } from 'react';

const Books = ({ show, books }) => {
  const [genres, setGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    setGenres([...new Set(books.map((book) => book.genres).flat())]);
  }, [books, setGenres]);

  useEffect(() => {
    if (selectedGenre === 'all') {
      setFilteredBooks(books);
    } else {
      const newBookList = books.filter((book) => book.genres.includes(selectedGenre));
      setFilteredBooks(newBookList);
    }
  }, [books, selectedGenre]);

  const onGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <h3>Genres</h3>
      <select id="genres" value={selectedGenre} onChange={onGenreChange}>
        <option value="all">All Genres</option>
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
          {filteredBooks.map((book) => (
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
