import { useContext } from 'react';
import { NotificationContext } from '../NotificationContext';

export const Notification = () => {
  const { message } = useContext(NotificationContext);
  if (message === '') {
    return null;
  }
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  );
};
