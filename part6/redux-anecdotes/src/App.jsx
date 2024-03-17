import AnecdoteForm from './AnecdoteForm';
import AnecdoteList from './AnecdoteList';
import Filter from './Filter';

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
