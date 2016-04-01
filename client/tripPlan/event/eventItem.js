import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Avatar from 'material-ui/lib/avatar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up';
import Badge from 'material-ui/lib/badge';

const EventItem = ({ key, name, address, rating, tags, votes, photoUrl, voteOn }) => (
  <Card style={ { width: '75%', margin: '5% 12.5%' } }>
    <CardMedia
      overlay={<CardTitle title={name} subtitle={`${rating} : ${address}`} />}
    >
      <img src={photoUrl || '../assets/abstract.jpg' }
        className="event-item"
      />
    </CardMedia>
    <CardText>
      {tags.map(tag =>
        <div className="tooltip">
          <Avatar
            src={`../assets/${tag.toLowerCase()}.jpg`}
            style={{ margin: '0 2.5%' }}
            children={<span className="tooltip-text">{tag}</span>}
          />
        </div>
      )}
      <Badge
        className="voteIcon"
        badgeContent={votes.length}
        secondary
        badgeStyle={{ top: 12, right: 12 }}
        onClick={voteOn}
      >
        <FloatingActionButton mini>
          <ThumbUp />
        </FloatingActionButton>
      </Badge>
    </CardText>
  </Card>
);

EventItem.propTypes = {
  key: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
  address: React.PropTypes.string.isRequired,
  rating: React.PropTypes.number.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.string),
  votes: React.PropTypes.array.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
  voteOn: React.PropTypes.func.isRequired,
};

export default EventItem;
