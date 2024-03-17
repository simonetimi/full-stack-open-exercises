import { postAnecdotes } from '../connection';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import NotificationContext from '../NotificationContext';
import { useContext } from 'react';

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notificationDispatch({ type: 'ADD', payload: `You added a new anecdote.` });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    },
    onError: (err) => {
      notificationDispatch({
        type: 'ADD',
        payload: `Anecdote content must be at least 5 characters long. Err: ${err.message}`,
      });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
