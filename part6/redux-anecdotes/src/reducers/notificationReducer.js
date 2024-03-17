import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    removeMessage() {
      return '';
    },
  },
});

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    const delayInMs = delay * 1000;
    setTimeout(() => dispatch(removeMessage('')), delayInMs);
  };
};

export const { setMessage, removeMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
