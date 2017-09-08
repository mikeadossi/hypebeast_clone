const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const queries = require('./database/queries');
const passport = require('passport');

router.get('/', function(req, res) {

  Promise.all([queries.getPosts(), queries.getTopTenByHypeCount()]).then(results => {

    res.render('index', {
      posts: results[0],
      topTen: results[1]
    })
  }).catch(err => next(err))
})

router.get('/post/:id', function(req, res) {
  var id = req.params.id;
  console.log('called!!!');
  queries.getPost(id)
    .then( post => {
      res.render('post', { post: post })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})

router.get('/register', function(req, res) {
  res.render('register')
})

router.post('/register', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try{
    queries.createUser(email, password).then(() => {
      res.status(200).redirect('/login')
    })
  }catch(e){
    console.log(e);
  }
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', function(req, res) {
  // res.clearCookie('myCookie');
  res.status(200).redirect('/');
})

router.get('/auth/google', passport.authenticate('google'));

router.get('/auth/google/callback',
  passport.authenticate('google'),
  function(req, res) {
    res.redirect('/');
    res.json(req.user);
  }
);



module.exports = router;
