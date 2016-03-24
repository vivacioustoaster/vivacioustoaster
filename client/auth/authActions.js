import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
polyfill();
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
    user: {},
  },
});

export const login = () =>
  dispatch => {
    dispatch(requestLogin());
    const currentCookie = cookie.load('token');
    fetch('/api/me', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: currentCookie,
      },
    })
      .then(res => res.json())
      .then(response => {
        dispatch(receiveLogin(response));
        dispatch(push('/home'));
      })
      .catch(err => {
        dispatch(loginError(err));
        console.log('Error on login:', err);
      });
  };

export const checkForLogin = (isAuthenticated) =>
  dispatch => {
    const token = cookie.load('token');
    if (!isAuthenticated && token) {
      login()(dispatch);
    } else if (isAuthenticated) {
      dispatch(push('/home'));
    }
  };

export const logout = () =>
  dispatch => {
    dispatch(requestLogout());
    cookie.remove('token');
    dispatch(push('/'));
  };
