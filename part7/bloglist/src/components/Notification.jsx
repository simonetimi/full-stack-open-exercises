import { useContext } from 'react';
import { NotificationContext } from '../NotificationContext';
import { Snippet } from '@nextui-org/react';

export const Notification = () => {
  const { message } = useContext(NotificationContext);
  if (message === '') {
    return null;
  }
  return (
    <Snippet hideCopyButton color="success" symbol="">
      {message}
    </Snippet>
  );
};
