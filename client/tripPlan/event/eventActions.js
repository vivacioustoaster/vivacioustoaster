import cookie from 'react-cookie';
import { fetchVotes } from '../vote/voteActions';

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS_IN_DEST = 'RECEIVE_EVENTS_IN_DEST';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

const requestEvents = () => ({
  type: REQUEST_EVENTS,
});

const receiveEventsInDest = events => ({
  type: RECEIVE_EVENTS_IN_DEST,
  payload: {
    events,
  },
});

const fetchEventsError = message => ({
  type: FETCH_EVENTS_FAILURE,
  payload: {
    // TODO
  },
});

export const clearDest = () => ({
  type: 'CLEAR_DEST',
});

export const fetchEvents = (destination, userId) =>
  dispatch => {
    const token = cookie.load('token');
    dispatch(requestEvents());
    return fetch(`/api/destinations/${destination.id}/events`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token,
      },
    }).then(res => res.json())
      .then(events => {
        dispatch(receiveEventsInDest(events))
        .then(() =>
            dispatch(fetchVotes(events, userId))
          );
      })
      .catch(err => console.error(err)); // add proper error handling
  };
