import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import Home from '../home/home';
import Auth from '../auth/auth';
import Friend from '../friend/friendList';
import Query from '../query/queryList';
import Tag from '../tag/tagList';
import Trip from '../trip/tripList';
import TripPlan from '../tripPlan/tripPlan';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { push } from 'react-router-redux';

const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.auth.get('user'),
  failureRedirectPath: '/auth',
  redirectAction: push,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(Home)} />
    <Route path="home" component={requireAuthentication(Home)} />
    <Route path="auth" component={Auth} />
    <Route path="friend" component={requireAuthentication(Friend)} />
    <Route path="query" component={requireAuthentication(Query)} />
    <Route path="tag" component={requireAuthentication(Tag)} />
    <Route path="trip" component={requireAuthentication(Trip)} />
    <Route path="tripPlan" component={requireAuthentication(TripPlan)} />
    <Route status={404} path="*" component={requireAuthentication(Home)} />
  </Route>
);
