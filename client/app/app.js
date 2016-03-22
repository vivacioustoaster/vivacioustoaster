import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from './header';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { store } from  '../store/configureStore';
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

console.log("should redirect to auth from app.js");

// componentDidMount() {
//   console.log('component mounted');
  // if (state.auth.get('isAuthenticated') === false) {
    store.dispatch(push('/auth'));
//   }
// }

const App = ({ children }) => (
  <div>
    <Header />
    <div>{children}</div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
