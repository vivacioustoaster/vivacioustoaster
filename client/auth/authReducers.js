import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from './authActions';
import { Map } from 'immutable';

const initialState = Map({
  user: {},
  isAuthenticated: false,
  isFetchingAuth: false,
}); // map auth state to the props
// and then in component.prop.types, require that state


export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isFetchingAuth', action.payload.isFetchingAuth);
    // TODO LOGIN_FAILURE
    case LOGIN_SUCCESS:
      state = state.set('user', action.payload.user);
      state = state.set('isFetchingAuth', action.payload.isFetchingAuth);
      state = state.set('isAuthenticated', action.payload.isAuthenticated);
      return state;
    case LOGOUT_REQUEST:
      state = state.set('user', action.payload.user);
      state = state.set('isFetchingAuth', action.payload.isFetchingAuth);
      state = state.set('isAuthenticated', action.payload.isAuthenticated);
      return state;
    default:
      return state;
  }
};
