import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAnecdotes, updateVotes } from './connection';
import NotificationContext from './NotificationContext';
import { useContext } from 'react';

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const updateVotesMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notificationDispatch({ type: 'ADD', payload: `You voted: ${data.content}` });
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000);
    },
  });

  const handleVote = (anecdote) => {
    updateVotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
    retry: 1,
  });

  if (anecdotes.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
