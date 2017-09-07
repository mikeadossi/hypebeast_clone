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

module.exports = router;
