import fetch from 'isomorphic-fetch';
import { setTripAndGetDestinations } from '../tripPlan/tripPlanActions';

// Redux-Thunk Middleware (see configureStore.js) allows us to return a function that
// can dispatch other actions. In this case, we return a function that:
// (1) POSTs a new trip
// (2) dispatches an action to update the state with the selected trip and GET
//     destinations for that trip id

export const save = (destinations, tripType, friends) =>
  dispatch =>
    fetch('/api/trips', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destinations,
        tripType,
        friends,
      }),
    }).then(res => res.json())
      .then(trip => dispatch(setTripAndGetDestinations(trip)))
      .catch(err => console.error(err)); // add proper error handling

export const toggleEvent = event => ({
  type: 'TOGGLE_EVENT',
  payload: {
    event,
  },
});
