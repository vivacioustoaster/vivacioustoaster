import $ from 'jquery';
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
      console.log('ISAUTHENTICATED UPON CHECKFORLOGIN :)');
      // dispatch(push('/home'));
    }
  }

export const login = () =>
  dispatch => {
    console.log('inside login');
    dispatch(requestLogin());

    // const userRequest = new Request('/api/me', {
    //   method: 'post',
    //   headers: {
    //     token: cookie.load('token'),
    //     'Content-Type': 'application/json',
    //   },
    // });
    const currentCookie = cookie.load('token');
    // console.log('currentCookie in login is ', currentCookie);
    // fetch('/api/me', {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     token: currentCookie,
    //   },
    // })
    $.ajax({
      url: '/api/me',
      type: 'GET',
      headers: {
        token: currentCookie,
      },
      contentType: 'application/json',
      success: (response) => {
        console.log('RESPONSE FROM USERREQUEST IS ---', response);
        dispatch(receiveLogin(response));
        // set response.user to the state
        // dispatch(push('/home'));
      },
      error: (err) => {
        console.log('Error on login:', err);
      },
    });
    // var options = {
    //   uri: '/api/me',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     token: currentCookie,
    //   },
    //   json: true // Automatically parses the JSON string in the response
    // };

    // rp(options)
    //   .then(response => {
    //     console.log('RESPONSE FROM USERREQUEST IS ---', response);
    //     dispatch(receiveLogin(response));
    //     // set response.user to the state
    //     // dispatch(push('/home'));
    //   })
    //   .catch(err => {
    //     console.log('Error on login:', err);
    //   });
  };

export const logout = () =>
  dispatch => {
    dispatch(requestLogout());
    cookie.remove('token');
    dispatch(push('/'));
  };
