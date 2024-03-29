import { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommendations from './components/Recommendations';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, LOGIN, ME, BOOK_ADDED } from './queries';

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const currentUser = useQuery(ME);
  const [token, setToken] = useState('');
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.token;
      setToken(token);
      localStorage.setItem('token', token);
      setPage('authors');
    },
  });
  const [page, setPage] = useState('authors');

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const book = data.data.bookAdded;
      window.alert(`Added book: ${book.title}`);
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(book),
        };
      });
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);
  const onLogout = () => {
    localStorage.clear();
    setToken('');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === '' ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={onLogout}>logout</button>
          </>
        )}
      </div>

      {authors.loading || books.loading ? (
        'Loading...'
      ) : (
        <main>
          <Authors
            show={page === 'authors'}
            authors={authors.data.allAuthors}
            editAuthor={editAuthor}
          />

          <Books show={page === 'books'} books={books.data.allBooks} />
          <NewBook show={page === 'add'} addBook={addBook} />
          <Login show={page === 'login'} login={login} setToken={setToken} />
          <Recommendations show={page === 'recommendations'} currentUser={currentUser} />
        </main>
      )}
    </div>
  );
};

export default App;
