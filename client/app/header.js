import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { AppBar, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router';
import { logout } from '../auth/authActions';
import { fetchTrips } from '../trip/tripActions';
import { deselectTrip } from '../tripPlan/tripPlanActions';
import { clearAll } from '../tripPlan/dest/destActions';
import { clearDest } from '../tripPlan/event/eventActions';

const mapDispatchToProps = dispatch => ({
  onLogout: id => dispatch(logout()),
  onClickTrips: () => dispatch(fetchTrips()),
  onClear: () => dispatch(clearAll()),
  onClearEvents: () => dispatch(clearDest()),
  onDeselect: () => dispatch(deselectTrip()),
});

let Header = ({ onLogout, onClickTrips, onClear, onDeselect, onClearEvents }) => (
  <AppBar title="voyAger" className="header" showMenuIconButton={false}>
    <img src="../assets/planelogo.png" id="headerLogo" style={ { width: '40px' } } />
    <Link to="/trip"><Tab label="My Trips" onClick={ () => {
      onClickTrips();
      onClearEvents();
      onClear();
      onDeselect();
    }}
    />
    </Link>
    <Link to="/home"><Tab label="Home" onClick={ () => {
      onClear();
      onDeselect();
      onClearEvents();
    }}
    />
    </Link>
    <Tab label="Logout" className="logout" onClick={() => onLogout()} />
  </AppBar>
);

Header.propTypes = {
  onLogout: React.PropTypes.func.isRequired,
  onClickTrips: React.PropTypes.func.isRequired,
  onClear: React.PropTypes.func.isRequired,
  onClearEvents: React.PropTypes.func.isRequired,
  onDeselect: React.PropTypes.func.isRequired,
};

Header = connect(null, mapDispatchToProps)(Header);

export default Header;
