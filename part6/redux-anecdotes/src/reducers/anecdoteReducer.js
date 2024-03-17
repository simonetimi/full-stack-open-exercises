import { createSlice } from '@reduxjs/toolkit';
import { getAll, createNew, updateOne } from '../utils/connect';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    addVote(state, action) {
      return state.map((anecdote) => {
        if (anecdote.id === action.payload.id) {
          return action.payload;
        }
        return anecdote;
      });
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const response = await createNew(content);
    dispatch(addAnecdote(response));
  };
};

export const updateVote = (id) => {
  return async (dispatch) => {
    const response = await updateOne(id);
    dispatch(addVote(response));
  };
};

export const { addAnecdote, addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
