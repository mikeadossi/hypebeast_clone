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

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    prompt: 'select_account',
    failureRedirect: '/error'
  }),
  function(req, res) {
    res.redirect('/');
    res.json(req.user);
  }
);

router.get('/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: ['user_friends', 'manage_pages']
  } ));

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

router.get('/brands/:brand', function(req, res) {
  let brand = req.params.brand;
  Promise.all([
    hbx_queries.getBrandDetails(brand),
    hbx_queries.getInventory(brand),
    hbx_queries.getBrandCategories(brand),
    hbx_queries.getBrandProductColors(brand),
    hbx_queries.getBrandPriceRange(brand),
    hbx_queries.getProductCount(brand)
  ])
    .then( results => {
      let brand = results[0];
      let product = results[1];
      let categories = results[2];
      let colors = results[3];
      let ranges = results[4];
      let product_count = results[5];

      let categories_arr = [];
      for(let i = 0; i < categories.length; i++){
        categories_arr.push(categories[i].category_type);
      }

      let colors_arr = [];
      for(let i = 0; i < colors.length; i++){
        colors_arr.push(colors[i].color);
      }
      // console.log('product_count[0]: ',product_count[0]);
      // below we get all unique items in the categories_arr and colors_arr.
      categories_arr = categories_arr.filter(
        function(item,pos){
          return categories_arr.indexOf(item) == pos
        });

      colors_arr = colors_arr.filter(
        function(item,pos){
          return colors_arr.indexOf(item) == pos
        });

      let product_images;
      let store_prod_images = [];

      for(let i = 0; i < product.length; i++){
        product_images = product[i].product_images.replace(/[']+/g, '');
        product_images = product_images.split(",");
        store_prod_images.push(product_images[0]);
        store_prod_images.push(product_images[1]);
      }

      let size_arr = ['S','M','L','XL','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','28','30','32','34','36'];
      let brand_names = ['small_count','medium_count','large_count','xlarge_count','us_8_count','us_8_5_count','us_9_count','us_9_5_count','us_10_count','us_10_5_count','us_11_count','us_11_5_count','us_12_count','us_12_5_count','pants_28_count','pants_30_count','pants_32_count','pants_34_count','pants_36_count'];

      let product_count_arr = [];
      for(let i = 0; i < 18; i++){
        if(product_count[0][brand_names[i]]){
          product_count_arr.push( size_arr[i] );
        }
      }

      res.render('hbx_store', {
        brand: brand,
        product: product,
        store_prod_images: store_prod_images,
        categories_arr: categories_arr,
        colors_arr: colors_arr,
        price_range_arr: ranges,
        product_count_arr: product_count_arr
      })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})

router.get('/brands/:brand/:product', function(req, res) {
  let brand = req.params.brand;
  let product = req.params.product;
  hbx_queries.getProductContent(brand,product)
    .then( results => {
      let brandNameObj = {
        '11-by-boris-bidjan-saberi': '11 by Boris Bidjan Saberi',
        'tres-bien': 'Tres Bien',
        'adidas-originals': 'Adidas Originals',
        'denim-by-vanquish-fragment': 'Denim by Vanquish & Fragment',
        'mastermind-world': 'Mastermind World',
        'undercover': 'Undercover'
      }

      res.render('hbx_product', {
        product_content: results,
        brand_name_string: brandNameObj[brand]
      })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})



module.exports = router;
