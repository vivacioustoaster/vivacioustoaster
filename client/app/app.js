import React from 'react';
import Header from './header';
import Home from '../home/home';
import Auth from '../auth/auth';
import Friend from '../friend/friendList';
import Query from '../query/queryList';
import Tag from '../tag/tagList';
import Trip from '../trip/tripList';
import TripOverview from '../tripPlan/tripOverview/travelFriendList';
import Dest from '../tripPlan/dest/destList';
import Event from '../tripPlan/event/eventList';

const App = () => (
  <div>
  <Header />
  <Home />
  <Auth />
  <Friend />
  <Query />
  <Tag />
  <Trip />
  <TripOverview />
  <Dest />
  <Event />
  </div>
);

export default App;
