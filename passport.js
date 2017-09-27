const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const queries = require('./database/queries.js');
const config = require('./config');

const strategy = (new LocalStrategy(
  function(username, password, done) {
    try{
      queries.find(username, password)
        .then(result => {
          if(!result) {
            return done(null, false, {message: 'Incorrect username or password'});
          } else {
            return done(null, result);
          }
        })
    }catch(e){console.log(e);}
  })
);

const googleStrategy = (new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },

  function(accessToken, refreshToken, profile, done) {
    // we get back a profile object offering us information about the user.
    var searchAndUpdate = {
      name: profile.displayName,
      someID: profile.id
    };

    queries.findOneAndUpdateGh(searchAndUpdate)
      .then(user => {
        return done(null, user) // serializes it at done
      });
  }

));

const facebookStrategy = (new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },

  function(accessToken, refreshToken, profile, done) {
    var searchAndUpdate = {
      name: profile.displayName,
      someID: profile.id
    };

    queries.findOneAndUpdateFb(searchAndUpdate)
      .then(user => {
        return done(null, user)
      });
  }

));

passport.use(strategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

passport.serializeUser(function(user, done) {
  done(null, user.id); // sends to deserialize
});

passport.deserializeUser(function(id, done) {
  queries.findByIdGoogle(id)
    .then(user => done(null,user[0])) // sends to entire application
    .catch(error => done(error, null))
});

module.exports = passport
