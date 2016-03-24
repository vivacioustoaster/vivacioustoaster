import Immutable from 'immutable';

const initialState = Immutable.Map({});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EVENT':
      if (state.get(action.payload.event.id)) {
        return state.delete(action.payload.event.id);
      }
      return state.set(action.payload.event.id, action.payload.event);
    default:
      return state;
  }
};
