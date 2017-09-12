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
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const strategy = (new LocalStrategy(
  function(username, password, done) {
    console.log('strategy!');
    try{
      queries.find(username, password)
        .then(result => {
          if(!result) {
            console.log('login failed!');
            return done(null, false, {message: 'Incorrect username or password'});
          } else {
            console.log('logged in');
            return done(null, result);
          }
        })
    }catch(e){console.log(e);}
  })
);

const googleStrategy = (new GoogleStrategy({
    clientID: config.google.consumerKey,
    clientSecret: config.google.consumerSecret,
    callbackURL: config.google.callbackURL
  },

  function(accessToken, refreshToken, profile, done) {
    // we get back a profile object offering us informatin about the user.
    var searchAndUpdate = {
      name: profile.displayName,
      someID: profile.id,
      image: profile._json.image.url
    };

    queries.findOneAndUpdate(searchAndUpdate)
      .then(user => {
        console.log('AUTHORIZING STRATEGY...',user);

        done(null, user)
      });
  }

));

passport.use(strategy);
passport.use(googleStrategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // console.log('deserialize ID: ',id,' <=============');
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
  saveUnitialized: false
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// app.use(function(req, res, next) {
//   // console.log('err =============>>>> ',err);
//   const err = new Error('Not Found')
//   err.status = 404
//   next(err)
// });

/* Handle sendgrid email feature */
sgMail.setApiKey(config.sendgridApiKey);

const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);


module.exports = app;

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
