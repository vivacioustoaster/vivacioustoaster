const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// dotenv sets up the process.env variables. Put env variables in a .env file in your root
require('dotenv').config({ path: `${__dirname}/../.env` });
const PORT = process.env.PORT;
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const db = require('./config/db.js');
const User = require('./users/users');

require('./config/middleware.js')(app, express);
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

require('./config/routes.js')(app, express);

io.on('connection', function(socket){
  console.log('a user connected');
});

app.set('port', PORT);
http.listen(PORT);
console.log(`Listening on port ${PORT}`);

// PASSPORT FACEBOOK STRATEGY configuration=================

// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

passport.use(new Strategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FB_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'picture.height(150).width(150)', 'friends'],
},
  (accessToken, refreshToken, profile, cb) => {
    // call a function which checks if user is in db
    User.findOrCreate(profile)
    .then(() => cb(null, profile));
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = app;
