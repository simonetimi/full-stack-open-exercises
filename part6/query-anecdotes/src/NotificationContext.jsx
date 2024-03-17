import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.payload;
    case 'REMOVE':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
