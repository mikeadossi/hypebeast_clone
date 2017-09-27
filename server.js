require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes.js');
const config = require('./config');
const flash = require('connect-flash');
const passport = require('./passport')

const app = express();


app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());

app.use(session({
  secret: config.secret,
  resave: true,
  saveUnitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.use(function(req, res) {
  const err = new Error('Not Found')
  err.status = 404
  // next(err)
});

// app.use(function(req, res, next) {
//   res.locals.username = req.user.username;
//   next();
// })

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

module.exports = app;
