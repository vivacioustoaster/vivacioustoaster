import React from 'react';
import QueryItem from './queryItem';
import { connect } from 'react-redux';
import NavigationArrowForward
from '../../node_modules/material-ui/lib/svg-icons/navigation/arrow-forward';
import NavigationArrowBack
from '../../node_modules/material-ui/lib/svg-icons/navigation/arrow-back';
import { Link } from 'react-router';
import { save, toggleEvent } from './queryActions';
import { Map } from 'immutable';
import List from 'material-ui/lib/lists/list';
import _ from 'lodash';

const mapStateToProps = state => ({
  destination: [{
    startDate: state.home.getIn(['destination', 'startDate']),
    endDate: state.home.getIn(['destination', 'endDate']),
    location: state.home.getIn(['destination', 'location']),
  }],
  tripType: state.home.get('tripType'),
  friends: state.friend.get('friends').filter((friend) =>
    friend.addedToTrip),
  events: state.tag.get('events'),
});

const mapDispatchToProps = dispatch => ({
  onClickSave: (destination, tripType, friends) => dispatch(save(destination, tripType, friends)),
  onClickToggle: event => dispatch(toggleEvent(event)),
});

let QueryList = ({ destination, tripType, onClickSave, friends, events, onClickToggle }) => (
  <div>
  <List>
  {events.map(event =>
        <QueryItem key={ event.id } icon={ event.icon }
          name={ event.name } address={ event.formatted_address }
          rating={ event.rating } eventToggle={ () =>
            onClickToggle(event) }
        />
      )}
  </List>
  <Link to="tag"><NavigationArrowBack /></Link>
  <Link to="tripPlan"><NavigationArrowForward onClick={ () =>
    onClickSave(destination, tripType, friends) }
  />
  </Link>
  </div>
);

QueryList.propTypes = {
  destination: React.PropTypes.object,
  tripType: React.PropTypes.string,
  friends: React.PropTypes.array,
  onClickSave: React.PropTypes.func,
  onClickToggle: React.PropTypes.func,
  events: React.PropTypes.array,
};

QueryList = connect(mapStateToProps, mapDispatchToProps)(QueryList);
export default QueryList;
