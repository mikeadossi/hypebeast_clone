const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const queries = require('./database/queries');
const hbx_queries = require('./database/hbx_queries');
const passport = require('./passport');

/************************** Hypebeast (below) *******************************/

router.get('/', function(req, res, next) {
  // console.log('req.user => ',req.user);
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

    // console.log('req.user (routes,26) => ',req.user);

    res.render('index', {
      posts: results[0],
      topTen: results[1],
      postTitles: post_titles,
      user: req.user
    })
  }).catch(err => next(err))
})

router.get('/post/:id', function(req, res) {
  const id = req.params.id;

  Promise.all([queries.getPost(id), queries.getPostComments(id)]).then( results => {
      const post = results[0];
      const all_comments = results[1];

      // console.log('all_comments (routes,41) => ',all_comments);

      res.render('post', {
        post: post,
        all_comments: all_comments,
        user: req.user })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})

router.get('/hbx_store/:id', function(req, res) {
  const id = req.params.id;

  queries.getPost(id)
    .then( brand => {
      res.render('hbx_brand', { brand: brand })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})

router.get('/store', function(req, res) {
  res.render('hbx_index');
})

router.get('/register/success', function(req, res) {
  res.render('successful_register');
})

router.get('/loggedIn', function(req, res) {
  const email = req.user.username
  if(req.user) {
        res.render('index', {
          user: req.user
        })
        .catch( err => {
          console.log('err: ', err);
        })
    } else {
      res.redirect('/error')
    }
})

router.get('/account', function(req, res) {
  if(req.user){
    res.render('account', {user: req.user});
  } else {
    res.render('error')
  }
})

router.get('/account/password', function(req, res) {
  if(req.user){
    res.render('change_password', {user: req.user});
  } else {
    res.render('error');
  }
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
      res.status(200).redirect('/register/success')
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
  res.redirect('/');
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
    // res.json(req.user);
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

router.post('/post/post_comment/:id', function(req, res) {
  const user_comment = req.body.user_comment;
  const article_id = req.params.id;
  const user_id = req.user.id;
  const user_name = req.user.username;

  console.log('user_id: ',user_id,'\n', 'article_id: ',article_id,'\n','user_comment: ',user_comment,'\n');

  try{
    queries.storeComment(user_comment, article_id, user_id, user_name).then(() => {
      res.status(200).redirect('/post/'+article_id)
    })
  }catch(e){
    console.log(e);
  }
});


/**************************** HBX (below) ***********************************/

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
      let product_sizes = results[5];

      let categories_arr = [];
      for(let i = 0; i < categories.length; i++){
        categories_arr.push(categories[i].category_type);
      }

      let colors_arr = [];
      for(let i = 0; i < colors.length; i++){
        colors_arr.push(colors[i].color);
      }

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

      let product_sizes_arr = [];
      let p = 0; for(key in product_sizes){p++}
      var numOfProds = p;
      for(let j = 0; j < numOfProds; j++){
        for(let i = 0; i < 19; i++){
          if(product_sizes[j][brand_names[i]] && !(product_sizes_arr.indexOf(size_arr[i]) > -1) ){
            product_sizes_arr.push( size_arr[i] );
          }
        }
      }

      res.render('hbx_store', {
        brand: brand,
        product: product,
        store_prod_images: store_prod_images,
        categories_arr: categories_arr,
        colors_arr: colors_arr,
        price_range_arr: ranges,
        product_sizes_arr: product_sizes_arr
      })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})

// router.get('/brands/:brand?sort=desc', function(req, res) {
// })
//
// router.get('/brands/:brand?sort=asc', function(req, res) {
// })


router.get('/brands/:brand/:product', function(req, res) {
  let brand = req.params.brand;
  let product = req.params.product;

  Promise.all([
    hbx_queries.getProductContent(brand,product),
    hbx_queries.getProductSizes(product),
    hbx_queries.getProductColors(product),
    hbx_queries.getAllHBXProducts()
  ])
    .then( results => {
      let product_content = results[0];
      let product_sizes = results[1];
      let product_colors = results[2];
      let all_hbx_products = results[3];

      let brandNameObj = {
        '11-by-boris-bidjan-saberi': '11 by Boris Bidjan Saberi',
        'tres-bien': 'Tres Bien',
        'adidas-originals': 'Adidas Originals',
        'denim-by-vanquish-fragment': 'Denim by Vanquish & Fragment',
        'mastermind-world': 'Mastermind World',
        'undercover': 'Undercover'
      }

      let product_images_arr = product_content[0].product_images.split(',')

      let size_arr = ['S','M','L','XL','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','28','30','32','34','36'];
      let brand_names = ['small_count','medium_count','large_count','xlarge_count','us_8_count','us_8_5_count','us_9_count','us_9_5_count','us_10_count','us_10_5_count','us_11_count','us_11_5_count','us_12_count','us_12_5_count','pants_28_count','pants_30_count','pants_32_count','pants_34_count','pants_36_count'];

      let product_sizes_arr = [];
      for(let i = 0; i < 18; i++){
        if(product_sizes[0][brand_names[i]]){
          product_sizes_arr.push( size_arr[i] );
        }
      }

      const product_colors_arr = Object.values(product_colors[0]);


      const related_products_arr = [];
      const product_name = product_content[0].product_name_route;
      let hbx_product_brand;
      let hbx_product_name;
      let hbx_product_obj;
      let first_image;
      let ex = 0
      for(key in all_hbx_products){
        hbx_product_brand = Object.values(all_hbx_products[key]);
        hbx_product_obj = {};
        hbx_product_obj.brand = hbx_product_brand[0];
        first_image = hbx_product_brand[1];
        first_image = first_image.split(',');
        first_image = first_image[0];
        hbx_product_obj.images = first_image;

        if( hbx_product_obj.name !== product_name ){
          related_products_arr.push(hbx_product_obj);
        }
      }



      let this_brand_images_arr = [];
      let brand_name_string = product_content[0].brand_name;
      let category_id = product_content[0].category_id;
      let product_obj;

      let our_product_name;

      for(let q = 0; q < related_products_arr.length; q++){
        if(related_products_arr[q] && related_products_arr[q].images.includes(brand_name_string) && related_products_arr[q].images.includes(category_id) && related_products_arr[q] !== ''){
          product_obj = {}

          our_product_name = related_products_arr[q].images;
          our_product_name = our_product_name.split(',');
          our_product_name = our_product_name[0];
          our_product_name = our_product_name.split('/');
          our_product_name = our_product_name[5];
          our_product_name = our_product_name.split('_');
          our_product_name = our_product_name[0];

          product_obj.brand = related_products_arr[q].brand
          product_obj.image = related_products_arr[q].images
          product_obj.product_name = our_product_name

          this_brand_images_arr.push(product_obj);
          related_products_arr[q] = null;
        }
      }
      for(let i = 0; i < related_products_arr.length; i++){

        if(related_products_arr[i] && related_products_arr[i].images.includes(brand_name_string) && related_products_arr[i] !== undefined){
          product_obj = {}

          our_product_name = related_products_arr[i].images;
          our_product_name = our_product_name.split(',');
          our_product_name = our_product_name[0];
          our_product_name = our_product_name.split('/');
          our_product_name = our_product_name[5];
          our_product_name = our_product_name.split('_');
          our_product_name = our_product_name[0];

          product_obj.brand = related_products_arr[i].brand
          product_obj.image = related_products_arr[i].images
          product_obj.product_name = our_product_name

          this_brand_images_arr.push(product_obj);
          related_products_arr.splice(i,1,null);
        }
      }
      for(let j = 0; j < related_products_arr.length; j++){
        if(related_products_arr[j] && related_products_arr[j] !== ''){
          product_obj = {}

          our_product_name = related_products_arr[j].images;
          our_product_name = our_product_name.split(',');
          our_product_name = our_product_name[0];
          our_product_name = our_product_name.split('/');
          our_product_name = our_product_name[5];
          our_product_name = our_product_name.split('_');
          our_product_name = our_product_name[0];

          product_obj.brand = related_products_arr[j].brand
          product_obj.image = related_products_arr[j].images
          product_obj.product_name = our_product_name

          this_brand_images_arr.push(product_obj);
          related_products_arr.splice(j,1,null);
        }
      }


      res.render('hbx_product', {
        product_content: product_content,
        product_images_arr: product_images_arr,
        brand_name_string: brandNameObj[brand],
        product_sizes_arr: product_sizes_arr,
        product_colors_arr: product_colors_arr,
        this_brand_images_arr: this_brand_images_arr
      })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})

router.get("/hbx_login", function(req, res) {
  res.render('hbx_login')
})

router.get("/hbx_register", function(req, res) {
  res.render('hbx_register')
})

router.get("/hbx_shopping_bag", function(req, res) {
  res.render('hbx_shopping_bag')
})



module.exports = router;
