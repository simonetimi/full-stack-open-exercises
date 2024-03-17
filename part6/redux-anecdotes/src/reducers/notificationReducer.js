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

export const { setMessage, removeMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
