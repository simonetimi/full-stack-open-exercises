import React, { createContext, useReducer, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    name: 'default',
    username: 'default',
    id: '',
    token: '',
  };

  const userReducer = (state, action) => {
    switch (action.type) {
      case 'set_user':
        return {
          name: action.payload.name,
          username: action.payload.username,
          id: action.payload.id,
          token: action.payload.token,
        };
      case 'clear_user':
        return initialState;
      default:
        return state;
    }
  };

  const [userState, dispatchUser] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ userState, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};
