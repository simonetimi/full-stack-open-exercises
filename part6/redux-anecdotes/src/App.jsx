import AnecdoteForm from './AnecdoteForm';
import AnecdoteList from './AnecdoteList';

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
