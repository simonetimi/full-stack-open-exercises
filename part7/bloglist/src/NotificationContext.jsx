import { createContext } from 'react';
import { useReducer } from 'react';

export const NotificationContext = createContext('');

function reducer(state, action) {
  switch (action.type) {
    case 'set_message': {
      return action.payload;
    }
    case 'clear': {
      return '';
    }
  }
}

const NotificationProvider = ({ children }) => {
  const [message, dispatchNotification] = useReducer(reducer, '');
  return (
    <NotificationContext.Provider value={{ message, dispatchNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
