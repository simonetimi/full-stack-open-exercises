import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: 'Nothing to see',
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
  },
});

export const { setMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
