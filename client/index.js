import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import tripApp from './app/reducers';
import App from './app/app';
import { Router, Route, Link, browserHistory } from 'react-router';

let store = createStore(tripApp); // eslint-disable-line prefer-const

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
