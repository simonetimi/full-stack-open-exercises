import { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, LOGIN } from './queries';

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

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
            <button
              onClick={() => {
                localStorage.clear();
                setToken('');
              }}
            >
              logout
            </button>
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
        </main>
      )}
    </div>
  );
};

export default App;
