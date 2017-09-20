const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const queries = require('./database/queries');
const hbx_queries = require('./database/hbx_queries');
const passport = require('passport');

/**************************** Hypebeast (below) *******************************/

router.get('/', function(req, res) {

  Promise.all([queries.getPosts(), queries.getTopTenByHypeCount()]).then(results => {

    const post_titles = [];
    let title;
    for(let i = 0; i < results[1].length; i++){
      title = results[1][i].post_title_string;
        title_length = title.split("").length;
        if(title_length <= 88){
          post_titles.push(title);
        } else {
          post_titles.push(title.substring(0,88) + '...')
        }
    }

    res.render('index', {
      posts: results[0],
      topTen: results[1],
      postTitles: post_titles
    })
  }).catch(err => next(err))
})

router.get('/post/:id', function(req, res) {
  let id = req.params.id;
  console.log('called!!!');
  queries.getPost(id)
    .then( post => {
      res.render('post', { post: post })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})

// router.get('/hbx_store/:id', function(req, res) {
//   let id = req.params.id;
//   console.log('called!!!');
//   queries.getPost(id)
//     .then( brand => {
//       res.render('hbx_brand', { brand: brand })
//     })
//     .catch( err => {
//       console.log('err: ', err);
//     })
// })

router.get('/store', function(req, res) {
  res.render('hbx_index');
})

router.get('/register/success', function(req, res) {
  res.render('successful_register');
})

router.get('/account', function(req, res) {
  res.render('account');
})

router.get('/account/password', function(req, res) {
  res.render('change_password');
})

router.get('/account/close-account', function(req, res) {
  res.render('close_account');
})

router.get('/register', function(req, res) {
  res.render('register')
})

router.post('/register', function(req, res) {
  const email = req.body.username;
  const password = req.body.password;

  try{
    queries.createUser(email, password).then(() => {
      res.status(200).redirect('/successful_register')
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
  req.logout();
  console.log('logged out!');
  res.status(200).redirect('/');
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { prompt: 'select_account', failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/');
    res.json(req.user);
  }
);

router.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: ['user_friends', 'manage_pages'] } ));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/');
    res.json(req.user);
  }
);

router.get('/auth/error', function(req, res){
  res.render('error');
});

router.get('/error', function(req, res) {
  res.render('error');
});


/****************************** HBX (below) ***********************************/

router.get('/browse_store/:id', function(req, res) {
  let id = req.params.id;
  Promise.all([hbx_queries.getStoreContent(id), hbx_queries.getProductContent(id)])
    .then( results => {
      let brand = results[0];
      let product = results[1];

      let product_images;
      let store_prod_images = [];

      for(let i = 0; i < product.length; i++){
        product_images = product[i].product_images.replace(/[']+/g, '');
        product_images = product_images.split(",");
        store_prod_images.push(product_images[0]);
        store_prod_images.push(product_images[1]);
      }

      res.render('hbx_store', {
        brand: brand,
        product: product,
        store_prod_images: store_prod_images
      })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})

router.get('/product/:id', function(req, res) {
  let id = req.params.id;
  hbx_queries.getSpecificProduct(id)
    .then( product => {
      res.render('hbx_product', { product: product })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})



module.exports = router;
