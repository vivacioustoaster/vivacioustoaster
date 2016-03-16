import React from 'react';
import { AppBar, Tabs, Tab } from 'material-ui';
import { Router, Route, Link, browserHistory } from 'react-router';
import Home from '../home/home';


const Header = () => (
  <div>
    <AppBar title="GUYS NAME THIS">
        <Tabs>
          <Tab label="My Trips" />
          <Tab label="Home" />
        </Tabs>
    </AppBar>
  </div>
);

export default Header;
