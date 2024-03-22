import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from './queries';

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });
  const [page, setPage] = useState('authors');

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {authors.loading || books.loading ? (
        'Loading...'
      ) : (
        <main>
          <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

          <Books show={page === 'books'} books={books.data.allBooks} />

          <NewBook show={page === 'add'} addBook={addBook} />
        </main>
      )}
    </div>
  );
};

export default App;
