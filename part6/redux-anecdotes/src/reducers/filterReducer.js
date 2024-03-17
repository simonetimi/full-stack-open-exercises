import { anecdotesAtStart } from './anecdoteReducer';

const filterReducer = (state = anecdotesAtStart, action) => {
  switch (action.type) {
    case 'FILTER': {
      return action.payload.term;
    }
    default:
      return state;
  }
};

export default filterReducer;

export const filterThis = (term) => {
  return {
    type: 'FILTER',
    payload: { term },
  };
};
