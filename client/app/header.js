import React, { Component, PropTypes } from 'react';
import { AppBar, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router';

const Header = () => (
  <AppBar title="Name This">
  	<button> Facebook button </button>
    <Link to="/trip"><Tab label="My Trips" /></Link>
    <Link to="/home"><Tab label="Home" /></Link>
  </AppBar>
);

export default Header;
