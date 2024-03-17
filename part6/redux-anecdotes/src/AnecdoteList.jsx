import { useSelector, useDispatch } from 'react-redux';
import { addVote } from './reducers/anecdoteReducer';

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    if (typeof state.filter !== 'string') {
      return state.anecdotes;
    }
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toString().toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const vote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
