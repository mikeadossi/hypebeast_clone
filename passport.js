const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const queries = require('./database/queries.js');
const config = require('./configure');

/* ~~~~~~~~~~~~~~~~~ local strategy ~~~~~~~~~~~~~~~~~ */

const strategy = (new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    console.log('\n email => ',email,'\n password => ',password);
    try{
      queries.findByEmail(email)
        .then(user => {
          console.log('\n passport(line 13) user => ',user,'\n');
          if(!user) {
          console.log('\n passport(line 15) user => USER UNDEFINED')
            return done(
              null,
              false,
              {message: 'user not found'});
          } else {
            // check if given password matches password in db
            console.log('lookey here!');
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

/* ~~~~~~~~~~~~~~~~~ google strategy ~~~~~~~~~~~~~~~~~ */

const googleVerificationCallback = (accessToken, refreshToken, profile, done) => {
  // we get back a profile object offering us information about the user.

  console.log('profile.emails[0].value :',profile.emails[0].value);
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
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },

  function(accessToken, refreshToken, profile, done) {
    googleVerificationCallback(accessToken, refreshToken, profile, done);
  }

));

passport.use('hbx-google', new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.hbxCallbackURL
  },

  function(accessToken, refreshToken, profile, done) {
    googleVerificationCallback(accessToken, refreshToken, profile, done);
  }

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
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'email']
  },

  function(accessToken, refreshToken, profile, done) {
    facebookVerificationCallback(accessToken, refreshToken, profile, done);
  }

));

passport.use('hbx-facebook', new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.hbxCallbackURL,
    profileFields: ['id', 'displayName', 'email']
  },

  function(accessToken, refreshToken, profile, done) {
    facebookVerificationCallback(accessToken, refreshToken, profile, done);
  }

));

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

passport.use(strategy);

passport.serializeUser(function(user, done) {
  // console.log('passport(line 114) user => ',user);
  // req.session.passport.user or req.user
  done(null, user.id); // sends to deserialize
});

passport.deserializeUser(function(id, done) {
  // console.log('passport(line 120) id => ',id);

// the serialize and deserialize steps help populate the cookie
  queries.findById(id)
    .then(user => {
      // console.log('passport(line 125) user: ',user);
      done(null, user[0])
    })
    .catch(error => {
      done(error)
    })

});

module.exports = passport
