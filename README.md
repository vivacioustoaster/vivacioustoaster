# Voyager
An intelligent, group-oriented decision-making travel app to help find places that fit your interests.

## Team

  - __Product Owner__: Leran Firer
  - __Scrum Master__: Boya Jiang
  - __Development Team Members__: Akshay Buddiga, Xuejing Lu

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

This repo uses the `dotenv` node module to manage env variables on your local machine. Create a .env file in your root with the appropriate environment variables for your third party client IDs and secrets. See .env.example for an example.
Run `webpack` in the root to build the app in dev mode. Run `NODE_ENV=production webpack` to build the app in production mode. Run `npm start` to start the app server.

Run `npm test` to run tests.

## Requirements

- Node 5.4.x
- Redis 2.6.x
- PostgreSQL 9.3.x

## Development

### File Hierarchy 
```js
Root
  |__client__
  |   |__app__
  |   |   |- app.js
  |   |   |- header.js
  |   |   |- reducers.js
  |   |   |- routes.js
  |   | 
  |   |__assets__
  |   |   |- pictures
  |   |     
  |   |__auth__
  |   |   |- auth.js
  |   |   |- authAction.js
  |   |   |- authReducer.js
  |   |   
  |   |__home__
  |   |   |- home.js
  |   |   |- tripTypeList.js
  |   |   |- tripTypeItem.js
  |   |   |- homeActions.js
  |   |   |- homeReducer.js
  |   |   |- destSearch.js
  |   |
  |   |__friend__
  |   |   |- friendList.js
  |   |   |- friendItem.js
  |   |   |- friendActions.js
  |   |   |- friendReducer.js
  |   |   
  |   |__tag__
  |   |   |- tagList.js
  |   |   |- tagActions.js
  |   |   |- tagReducer.js
  |   |   
  |   |__query__
  |   |   |- queryList.js
  |   |   |- queryItem.js
  |   |   |- queryActions.js
  |   |   |- queryReducer.js
  |   |
  |   |__home__
  |   |   |- destSearch.js
  |   |   |- home.js
  |   |   |- homeActions.js
  |   |   |- homeReducer.js
  |   |   |- tripTypeList.js
  |   |   
  |   |__trip__
  |   |   |- tripList.js
  |   |   |- tripItem.js
  |   |   |- tripActions.js
  |   |   |- tripReducers.js
  |   |
  |   |__store__
  |   |   |- configureStore.js
  |   |    
  |   |__tripPlan__
  |   |   |__tripOverview__
  |   |   |   |- travelFriendList.js
  |   |   |   |- travelFriendItem.js
  |   |   |   |- travelFriendActions.js
  |   |   |   |- travelFriendReducers.js
  |   |   |   
  |   |   |__dest__
  |   |   |   |- destList.js
  |   |   |   |- destItem.js
  |   |   |   |- destActions.js
  |   |   |   |- destReducers.js
  |   |   |
  |   |   |__event__
  |   |   |   |- eventList.js
  |   |   |   |- eventItem.js
  |   |   |   |- eventActions.js
  |   |   |   |- eventReducers.js
  |   |   | 
  |   |   |- index.js
  |   |   |- index.html
  |   |   |- index.min.js
  |   
  |__specs__
  |   |__client__
  |   |   |- app-spec.js
  |   |   |- event-spec.js
  |   |   |- dest-spec.js
  |   |   |- trip-spec.js
  |   |   |- query-spec.js
  |   |   |- friend-spec.js
  |   |   |- home-spec.js
  |   |   |- tag-spec.js
  |   |   |- auth-spec.js
  |   |
  |__server__  
  |   |__config__
  |   |   |- db.js
  |   |   |- helper.js
  |   |   |- middleware.js
  |   |   |- routes.js
  |   |
  |   |__destinations__
  |   |   |- destinations.js
  |   |   |- destinationsController.js
  |   |   
  |   |__events__
  |   |   |- events.js
  |   |   |- eventsController.js
  |   |   
  |   |__placeSearch__
  |   |   |- placeSearchController.js
  |   |
  |   |__trips__
  |   |   |- trips.js
  |   |   |- tripsController.js
  |   |   
  |   |__users__
  |   |   |- users.js
  |   |   |- usersController.js
  |   |
  |   |__utils__
  |   |   |- flickrSearch.js
  |   |   |- redisUtils.js
  |   |   |- tagClassifier.js
  |   |   
  |   |__votes__
  |   |   |- votes.js
  |   |   |- votesController.js
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
