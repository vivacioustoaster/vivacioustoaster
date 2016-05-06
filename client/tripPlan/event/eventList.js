import React from 'react';
import { connect } from 'react-redux';
import EventItem from './eventItem';
import List from 'material-ui/lib/lists/list';
import CardTitle from 'material-ui/lib/card/card-title';
import { voteOnEvent } from '../vote/voteActions';

const mapStateToProps = state => ({
  events: state.tripPlan.event.get('events'),
  votes: state.tripPlan.vote.get('votes'),
  destinations: state.tripPlan.dest.get('destinations'),
  user: state.auth.get('user'),
});

const mapDispatchToProps = dispatch => ({
  voteOnEvents: (eventId, userId, picUrl, hasVoted) => dispatch(voteOnEvent(eventId, userId, picUrl, hasVoted)), // eslint-disable-line
});

let EventList = ({ destinations, destIdx, events, votes, voteOnEvents, user }) => (
  <div>
    <CardTitle
      title={`Places To See In ${destinations[destIdx].location}`}
      style={{ textAlign: 'center' }}
    />
    <List>
      {events.get(destIdx).map((event, i) => {
        const eventVotes = votes.filter(v => v.eventId === event.id);
        return (<EventItem key={ event.id } {...event} votes={eventVotes}
          voteOn={() => voteOnEvents(event.id, user.id, user.picUrl, event.hasVoted)}
        />);
      })}
    </List>
  </div>
);

EventList.propTypes = {
  destinations: React.PropTypes.object.isRequired,
  events: React.PropTypes.array.isRequired,
  votes: React.PropTypes.array.isRequired,
  destIdx: React.PropTypes.number.isRequired,
  voteOnEvents: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
};

EventList = connect(mapStateToProps, mapDispatchToProps)(EventList);

export default EventList;
