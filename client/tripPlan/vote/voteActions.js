import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import Promise from 'bluebird';
import io from 'socket.io-client';
const socket = io();

export const REQUEST_VOTES = 'REQUEST_VOTES';
export const RECEIVE_VOTES = 'RECEIVE_VOTES';
export const FETCH_VOTES_FAILURE = 'FETCH_VOTES_FAILURE';
export const TOGGLE_EVENT_VOTE = 'TOGGLE_EVENT_VOTE';
export const ADD_VOTE = 'ADD_VOTE';
export const REMOVE_VOTE = 'REMOVE_VOTE';
export const TOGGLE_VOTE_ATTRIBUTE = 'TOGGLE_VOTE_ATTRIBUTE';

export const toggleEventVote = eventId => ({
  type: TOGGLE_EVENT_VOTE,
  payload: {
    eventId,
  },
});

export const addVote = (eventId, userId) => ({
  type: ADD_VOTE,
  payload: {
    eventId,
    userId,
  },
});

export const deleteVote = (eventId, userId) => ({
  type: REMOVE_VOTE,
  payload: {
    eventId,
    userId,
  },
});

export const toggleVote = (eventId, userId, hasVoted) =>
  dispatch => {
    if (hasVoted) {
      dispatch(deleteVote(eventId, userId));
    } else {
      dispatch(addVote(eventId, userId));
    }
    dispatch(toggleEventVote(eventId));
  };
export const toggleVoteAttribute = events => ({
  type: TOGGLE_VOTE_ATTRIBUTE,
  payload: {
    events,
  },
});

const receiveVotes = votes => ({
  type: RECEIVE_VOTES,
  payload: {
    votes,
  },
});

export const receiveVotesForEvents = (votes, events, userId) =>
  dispatch => {
    const votedOnEvents = events.filter((e, i) => _.some(votes[i], v => v.userId === userId));
    dispatch(toggleVoteAttribute(votedOnEvents));
    const allVotes = _.flattenDeep(votes);
    dispatch(receiveVotes(allVotes));
  };

const requestVotes = () => ({
  type: REQUEST_VOTES,
});

const fetchVotesError = message => ({
  type: FETCH_VOTES_FAILURE,
  payload: {
    // TODO
  },
});

export const fetchVotes = (events, userId) =>
  dispatch => {
    dispatch(requestVotes());
    const token = cookie.load('token');
    return Promise.all(events.map(event =>
      fetch(`/api/events/${event.id}/votes`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },

      }).then(res => res.json())
    )).then(votes => {
      dispatch(receiveVotesForEvents(votes, events, userId));
    })
    .catch(err => console.error(err)); // add proper error handling
  };

export const voteOnEvent = (eventId, userId, hasVoted) => {
  socket.emit('newVote', eventId, userId, hasVoted);
};

