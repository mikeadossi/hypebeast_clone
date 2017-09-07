const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const queries = require('./database/queries');
const async = require('async');

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

router.get('/login', function(req, res) {
  res.render('login')
})

router.get('/register', function(req, res) {
  res.render('register')
})


module.exports = router;
