import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import cookie from 'react-cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const requestLogin = () => ({
  type: LOGIN_REQUEST,
  payload: {
    isFetchingAuth: true,
  },
});

export const receiveLogin = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    isFetchingAuth: false,
    isAuthenticated: true,
    user,
  },
});

export const loginError = (message) => ({
  type: LOGIN_FAILURE,
  payload: {
    isFetchingAuth: false,
    isAuthenticated: false,
    message,
  },
});

export const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  payload: {
    isAuthenticated: false,
    isFetchingAuth: false,
    user: null,
  },
});
// place your api calls HURRS

export const checkForLogin = (isAuthenticated) =>
  dispatch => {
    const token = cookie.load('token');
    console.log('inside CheckForLogin, isAuthenticated is ', isAuthenticated);
    console.log('Token is ', token);
    if (!isAuthenticated && token){
      console.log('about to run login()');
      login()(dispatch);
    } else if (isAuthenticated) {
      dispatch(push('/home'));
    }
  }

export const login = () =>
  dispatch => {
    console.log('inside login');
    dispatch(requestLogin());

    const userRequest = new Request('/api/me', {
      method: 'get',
      headers: {
        token: cookie.load('token'),
        'Content-Type': 'application/json',
      },
    });

    fetch(userRequest)
      .then(response => {
        console.log(response);
        dispatch(receiveLogin(response));
        // set response.user to the state
        dispatch(push('/home'));
      })
      .catch(err => {
        console.log('Error on login:', err);
      });
  };

export const logout = () =>
  dispatch => {
    dispatch(requestLogout());
    cookie.remove('token');
    dispatch(push('/'));
  };
