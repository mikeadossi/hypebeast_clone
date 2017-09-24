require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes.js');
const config = require('./config');
const passport = require('passport');
const flash = require('connect-flash');
const queries = require('./database/queries.js');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

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
        done(null, user)
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
        done(null, user)
      });
  }

));

passport.use(strategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  queries.findById(id)
    .then(user => done(null,user))
    .catch(error => done(error, null))
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());

app.use(session({
  secret: config.secret,
  resave: true,
  saveUnitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(req, res, next) {
  // console.log('err =============>>>> ',err);
  const err = new Error('Not Found')
  err.status = 404
  next(err)
});


module.exports = app;

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
