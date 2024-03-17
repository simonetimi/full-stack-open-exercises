import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { addVote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const selectAnecdotes = (state) => state.anecdotes;
  const selectFilter = (state) => state.filter;

  // to remove the re-rendering warning from redux (memoization)
  const filteredAndSortedAnecdotesSelector = createSelector(
    [selectAnecdotes, selectFilter],
    (anecdotes, filter) => {
      if (typeof filter !== 'string') {
        return [...anecdotes].sort((a, b) => b.votes - a.votes);
      }
      return anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toString().toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes);
    }
  );

  const vote = (id) => {
    dispatch(addVote(id));

    const voted = anecdotes.filter((anecdote) => anecdote.id === id);
    dispatch(setMessage(`You voted: ${voted[0].content}`));
    setTimeout(() => dispatch(removeMessage('')), 5000);
  };
  const anecdotes = useSelector(filteredAndSortedAnecdotesSelector);

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
