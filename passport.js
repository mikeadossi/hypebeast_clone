require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const queries = require('./src/database/hypebeast/queries.js');

/* ~~~~~~~~~~~~~~~~~ local strategy ~~~~~~~~~~~~~~~~~ */

const strategy = (new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    try{
      queries.findByEmail(email)
        .then(user => {
          if(!user) {
            return done(
              null,
              false,
              {message: 'user not found'});
          } else {
            // check if given password matches password in db
            return queries.comparePassword(email, password)
              .then(result => {
                if(result){
                  return done(null, user);
                } else {
                  return done(null, false, {message: 'passwords do not match'})
                }
              })

          }
        })
    }catch(error){
      return done(error);
    }
  })
);

passport.use(strategy);

/* ~~~~~~~~~~~~~~~~~ google strategy ~~~~~~~~~~~~~~~~~ */

const googleVerificationCallback = (accessToken, refreshToken, profile, done) => {
  // we get back a profile object offering us information about the user.
  let userEmail = profile.emails[0].value
  return queries.findByEmail(userEmail)
    .then(user => {
      if(!user){
        return queries.createUser(userEmail)
          .then(newUser => {
            return done(null, newUser);
          })
      } else {
        return done(null, user); // serializes it at done
      }
    }).catch(error => {
      return done(error);
    });
};

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLECLIENTID,
    clientSecret: process.env.GOOGLECLIENTSECRET,
    callbackURL: process.env.GOOGLECALLBACKURL
  },

  function(accessToken, refreshToken, profile, done) {
    googleVerificationCallback(accessToken, refreshToken, profile, done);
  }

));

passport.use('hbx-google', new GoogleStrategy({
    clientID: process.env.GOOGLECLIENTID,
    clientSecret: process.env.GOOGLECLIENTSECRET,
    callbackURL: process.env.GOOGLEHBXCALLBACKURL
  }, googleVerificationCallback
));

/* ~~~~~~~~~~~~~~~~~ facebook strategy ~~~~~~~~~~~~~~~~~ */

const facebookVerificationCallback = (accessToken, refreshToken, profile, done) => {

  let userEmail = profile.emails[0].value

  return queries.findByEmail(userEmail)
    .then(user => {
      if(!user){
        return queries.createUser(userEmail)
          .then(newUser => {
            return done(null, newUser);
          })
      } else {
        return done(null, user); // serializes it at done
      }
    }).catch(error => {
      return done(error);
    });
}

passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOKCLIENTID,
    clientSecret: process.env.FACEBOOKCLIENTSECRET,
    callbackURL: process.env.FACEBOOKHBXCALLBACKURL,
    profileFields: ['id', 'displayName', 'email']
  },

  function(accessToken, refreshToken, profile, done) {
    console.log('profile ===> ',profile);
    facebookVerificationCallback(accessToken, refreshToken, profile, done);
  }

));

passport.use('hbx-facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOKCLIENTID,
    clientSecret: process.env.FACEBOOKCLIENTSECRET,
    callbackURL: process.env.FACEBOOKCALLBACKURL,
    profileFields: ['id', 'displayName', 'email']
  },

  function(accessToken, refreshToken, profile, done) {
    facebookVerificationCallback(accessToken, refreshToken, profile, done);
  }

));

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user.id); // sends to deserialize
});

passport.deserializeUser(function(id, done) {

// the serialize and deserialize steps help populate the cookie
  queries.findById(id)
    .then(user => {
      done(null, user[0])
    })
    .catch(error => {
      done(null, error)
    })

});

module.exports = passport
