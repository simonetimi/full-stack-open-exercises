import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const selectAnecdotes = (state) => state.anecdotes;
  const selectFilter = (state) => state.filter;

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
