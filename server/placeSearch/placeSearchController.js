'use strict'; // eslint-disable-line
const rp = require('request-promise');
const Promise = require('bluebird');
const _ = require('lodash');
const helpers = require('../config/helpers');
const tagClassifier = require('../utils/tagClassifier');
const GOOGLE_PLACES_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const MAX_PLACES_RETURNED = 20;
const redisUtils = require('../utils/redisUtils');
const redis = require('redis');

const client = redis.createClient();
let exist = false;
client.on('connect', () => {
  exist = true;
});
client.on('error', (err) => {
  console.log('error', err);
});
client.quit();

// Returns an object with only the desired attributes from the original Google Places place object.
const formatPlace = (place, options) => ({
  address: place.formatted_address,
  lat: place.geometry.location.lat,
  lng: place.geometry.location.lng,
  icon: place.icon,
  name: place.name,
  photo: place.photos ? place.photos[0] : null, // Object or null
  placeId: place.place_id,
  rating: place.rating ? place.rating : 2.5, // Set rating as mediocre if we don't have real rating
  types: place.types,
  tags: [options.tripsAppTag],
  addedToDest: false,
});


// Reduces the places list to a list of unique places, and combines tags for the places
// that are duplicated.
const getUniquePlacesAndConsolidateTags = (consolidatedPlaces) => {
  const uniquePlaces = _.reduce(consolidatedPlaces, (uniques, group) => {
    group.forEach((place) => {
      if (!uniques[place.placeId]) {
        uniques[place.placeId] = place;
      } else {
        const oldPlace = uniques[place.placeId];
        oldPlace.tags = _.chain(oldPlace.tags).concat(place.tags).uniq().value();
        uniques[place.placeId] = oldPlace;
      }
    });
    return uniques;
  }, {});

  return Object.keys(uniquePlaces).map(placeId => uniquePlaces[placeId]);
};


module.exports = {
  search: (req, res, next) => {
    const destinations = req.body.destinations;
    const tags = req.body.tags;

    Promise.all(destinations.map(destination => {
      // Places API doesn't take more than 3 types, so we slice to get the first three
      // types associated with each tag. I left the full type list intact so we can discuss
      // and experiment with which tags we should choose for the top 3.
      const tagTypes = tags.map(tag => ({
        tag: tag.name,
        types: tagClassifier[tag.name].slice(0, 3).join('|'),
      }));

      const optionsArray = tagTypes.map(tagType => ({
        uri: GOOGLE_PLACES_URL,
        qs: {
          key: process.env.GOOGLE_PLACES_KEY, // -> uri + '?key={{KEY}}'
          query: destination.location,
          types: tagType.types,
        },
        headers: {
          'User-Agent': 'Request-Promise',
        },
        json: true, // Automatically parses the JSON string in the response
        tripsAppTag: tagType.tag, // A hack so we have tag when constructing formatted place object
      }));
      // Promise.all returns an array of objects, same length as the number of tags.
      return Promise.all(optionsArray.map(options => {
        const key = `${options.qs.query}:  ${options.qs.types}`;
        if (exist) {
          return redisUtils.isInRedis(key).then((events) => {
            if (!events) {
              return rp(options)
                .then(data => {
                  // We return an object that has all the places (formatted) as the value paired to
                  // a key of the tag name.
                  const places = data.results;
                  const tagObj = {};
                  tagObj[options.tripsAppTag] = places.map(place => formatPlace(place, options));
                  redisUtils.createInRedis(key, tagObj);
                  return tagObj;
                })
                .catch(err => helpers.errorHandler(err, req, res, next));
            }
            return JSON.parse(events);
          });
        }
        return rp(options)
          .then(data => {
            // We return an object that has all the places (formatted) as the value paired to
            // a key of the tag name.
            const places = data.results;
            const tagObj = {};
            tagObj[options.tripsAppTag] = places.map(place => formatPlace(place, options));
            return tagObj;
          })
          .catch(err => helpers.errorHandler(err, req, res, next));
      }))
      .then(tagObjsArray => {
        // We reduce this array into a single object that contains the key-value pairs
        // of all the objects in the original array (essentially a merge).
        const consolidated = tagObjsArray.reduce((consolidatedPlaces, tagObj) => {
          for (let key in tagObj) { // eslint-disable-line
            if (tagObj.hasOwnProperty(key)) {
              consolidatedPlaces[key] = tagObj[key];
            }
          }
          return consolidatedPlaces;
        }, {});

        const uniquePlaces = getUniquePlacesAndConsolidateTags(consolidated);

        // Sort results and send back top 20
        const curatedPlaces = _.chain(uniquePlaces)
                               .orderBy(['rating'], ['desc'])
                               .slice(0, MAX_PLACES_RETURNED)
                               .value();
        return curatedPlaces;
      })
      .catch(err => helpers.errorHandler(err, req, res, next));
    }))
    .then(curatedPlacesArr => {
      res.json(curatedPlacesArr);
    })
    .catch(err => helpers.errorHandler(err, req, res, next));
  },
};
