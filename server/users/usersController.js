const User = require('./users');
const helpers = require('../config/helpers');

module.exports = {

  getUser: (req, res, next) => {
    console.log('FROM GETUSER, REQ.USER IS===========', req.user);
    console.log('req.user type is ', typeof req.user);
    res.json(req.user);
  },

  getFriends: (req, res, next) => {
    User.getUserFriends(req.user)
    .then(friends => {
      res.json(friends);
    })
    .catch(err => {
      helpers.errorHandler(err, req, res, next);
    });
  },

};
