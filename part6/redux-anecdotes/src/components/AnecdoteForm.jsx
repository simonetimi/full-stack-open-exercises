import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';
import { createNew } from '../utils/connect';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const add = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = '';
    const response = await createNew(content);
    dispatch(addAnecdote(response));
    dispatch(setMessage('You created a new note'));
    setTimeout(() => dispatch(removeMessage('')), 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
