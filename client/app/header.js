import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { AppBar, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router';
import { logout } from '../auth/authActions';


const mapDispatchToProps = dispatch => ({
  onLogout: id => dispatch(logout()),
});

let Header = ({ onLogout }) => (
  <AppBar title="Name This">
    <Link to="/trip"><Tab label="My Trips" /></Link>
    <Link to="/home"><Tab label="Home" /></Link>
    <button onClick={() => onLogout()}>LOGOUT</button>
  </AppBar>
);

Header.propTypes = {
  onLogout: React.PropTypes.func.isRequired,
};

Header = connect(null, mapDispatchToProps)(Header);

export default Header;
