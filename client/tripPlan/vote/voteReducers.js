import Immutable from 'immutable';
import { REQUEST_VOTES, RECEIVE_VOTES,
  FETCH_VOTES_FAILURE, ADD_VOTE, REMOVE_VOTE } from './voteActions';

const initialState = Immutable.Map({
  isFetching: false,
  votes: Immutable.List(),
});

const votes = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_VOTES:
      return state.set('isFetching', true);
    case RECEIVE_VOTES:
      state.set('isFetching', false);
      return state.set('votes', Immutable.List(action.payload.votes));
    case ADD_VOTE:
      const newVote = {
        eventId: action.payload.eventId,
        userId: action.payload.userId,
        picUrl: action.payload.picUrl,
      };
      const oldVotes = state.get('votes');
      return state.set('votes', oldVotes.push(newVote));
    case REMOVE_VOTE:
      let index;
      state.get('votes').forEach((v, i) => {
        if (v.userId === action.payload.userId && v.eventId === action.payload.eventId) {
          index = i;
        }
      });
      const dVotes = state.get('votes');
      return state.set('votes', dVotes.delete(index));
    default:
      return state;
  }
};

export default votes;
