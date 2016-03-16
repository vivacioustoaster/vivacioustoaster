import { combineReducers } from 'redux';
import auth from '../auth/authReducers';
import friend from '../friend/friendReducers';
import home from '../home/homeReducers';
import query from '../query/queryReducers';
import tag from '../tag/tagReducers';
import trip from '../trip/tripReducers';
import dest from '../tripPlan/dest/destReducers';
import event from '../tripPlan/event/eventReducers';
import tripOverview from '../tripPlan/tripOverview/travelFriendReducers';

const tripApp = combineReducers({
  auth,
  friend,
  home,
  query,
  tag,
  trip,
  dest,
  event,
  tripOverview,
});

export default tripApp;
