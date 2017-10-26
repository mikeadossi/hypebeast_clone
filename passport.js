const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const queries = require('./database/queries.js');
const config = require('./configure');

const strategy = (new LocalStrategy(
  function(username, password, done) {
    try{
      queries.find(username, password)
        .then(result => {
          if(!result) {
            return done(
              null,
              false,
              {message: 'Incorrect username or password'});
          } else {
            return done(null, result);
          }
        })
    }catch(error){
      return done(null, error);
    }
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
        return done(null, user); // serializes it at done
      }).catch(error => {
        return done(null, error);
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
        return done(null, user);
      }).catch(error => {
        return done(null, error);
      });
  }

));

passport.use(strategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

passport.serializeUser(function(user, done) {
  console.log('passport(line 78) user => ',user);
  done(null, user.id); // sends to deserialize
});

passport.deserializeUser(function(id, done) {
  console.log('passport(line 83) id => ',id);
  queries.findByIdGoogle(id)
    .then(user => {console.log('user[0] ->',user[0]); done(null,user[0])}) // sends to entire application
    .catch(error => done(null, error))

  // queries.findByIdFacebook(id)
  //   .then(user => done(null,user[0]))
  //   .catch(error => done(null, error))

  // queries.findById(id)
  //   .then(user => done(null,user[0]))
  //   .catch(error => done(null, error))
});

module.exports = passport
