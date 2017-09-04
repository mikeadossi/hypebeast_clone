const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const queries = require('./database/queries');

router.get('/', function(req, res) {
  queries.getPosts()
    .then( posts => {
        res.render('index', { posts: posts });
      })
    .catch( err => {
      console.log('err: ',err);
    });
});



module.exports = router;
