const express = require('express');
const router = express.Router();
const queries = require('./database/queries');
const hbx_queries = require('./database/hbx_queries');
const passport = require('./passport');
const {bcrypt} = require('./database/connection.js');
const {saltRounds} = require('./database/connection.js');

/************************** Hypebeast (below) *******************************/

router.get('/', function(req, res, next) {

  Promise.all(
    [
      queries.getPosts(),
      queries.getTopTenByHypeCount()
    ]
    ).then(results => {

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
      postTitles: post_titles,
      user: req.user
    })
  }).catch(err => next(err))
})

router.get('/post/:id', function(req, res) {
  const id = req.params.id;

  Promise.all(
    [
      queries.getPost(id),
      queries.getPostComments(id)
    ]
  ).then( results => {
      const post = results[0];
      const all_comments = results[1];

      res.render('post', {
        post: post,
        all_comments: all_comments,
        user: req.user
       })
    })
    .catch( err => {
      console.log('err: ', err);
      res.render('hbx_error', {user: req.user});
    })
})

router.get('/store', function(req, res) {

  if(req.user){
    let user_id = req.user.id;

    hbx_queries.getCartById(user_id)
    .then( cart => {
      res.render('hbx_index', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log('err: ',err);
      res.render('hbx_error', {user: req.user});
    })
  } else {
    res.render('hbx_index', {
      user: req.user
    });
  }

})

router.get('/register/success', function(req, res) {
  res.render('successful_register', { user: req.user });
})

router.get('/loggedIn', function(req, res) {

  if(req.user) {
        res.render('index', { user: req.user })
        .catch( err => {
          console.log('err: ', err);
          res.render('hbx_error', {user: req.user});
        })
    } else {
      res.redirect('/error')
    }
})

router.get('/account', function(req, res) {


  if(req.user){
    res.render('account', { user: req.user });
  } else {
    res.render('error')
  }
})

router.get('/account/password', function(req, res) {
  const user_id = req.user.id || '';

  hbx_queries.getCartById(user_id)
    .then( cart => {
      res.render('change_password', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log('err: ',err);
      res.render('hbx_error', {user: req.user});
    })

})

router.get('/account/close-account', function(req, res) {
  res.render('close_account', { user: req.user });
})

router.get('/register', function(req, res) {
  res.render('register')
})

router.post('/register', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try{
    queries.createUser(email, password)
    .then(() => {
      res.status(200).redirect('/register/success')
    })
  }catch(e){
    console.log(e);
  }
})

router.get('/login', function(req, res) {

  res.render('login', {
    user: req.user
   })
})

router.post('/login', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/login',
   failureFlash: true
}));


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['user_friends', 'manage_pages']
  } )
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/auth/error', function(req, res){
  res.render('error', { user: req.user });
});

router.get('/error', function(req, res) {
  res.render('error', { user: req.user });
});

router.post('/post/post_comment/:id', function(req, res) {
  const user_comment = req.body.user_comment;
  const article_id = req.params.id;
  const user_id = req.user.id;
  const user_name = req.user.username;

  try{
    queries.storeComment(user_comment, article_id, user_id, user_name)
    .then(() => {
      res.status(200).redirect('/post/'+article_id)
    })
  }catch(e){
    console.log(e);
  }
});


/**************************** HBX (below) ***********************************/

router.get('/brands/:brand', function(req, res) {

  let conditional_promise;

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  let brand = req.params.brand;
  Promise.all([
    hbx_queries.getBrandDetails(brand),
    hbx_queries.getInventory(brand),
    hbx_queries.getBrandCategories(brand),
    hbx_queries.getBrandProductColors(brand),
    hbx_queries.getBrandPriceRange(brand),
    hbx_queries.getProductCount(brand),
    conditional_promise
  ])
    .then( results => {

      let brand = results[0];
      let product = results[1];
      let categories = results[2];
      let colors = results[3];
      let ranges = results[4];
      let product_sizes = results[5];
      let cart = results[6];

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

      let size_arr = [
        'S',
        'M',
        'L',
        'XL',
        '8',
        '8.5',
        '9',
        '9.5',
        '10',
        '10.5',
        '11',
        '11.5',
        '12',
        '12.5',
        '28',
        '30',
        '32',
        '34',
        '36'
      ];

      let brand_names = [
        'small_count',
        'medium_count',
        'large_count',
        'xlarge_count',
        'us_8_count',
        'us_8_5_count',
        'us_9_count',
        'us_9_5_count',
        'us_10_count',
        'us_10_5_count',
        'us_11_count',
        'us_11_5_count',
        'us_12_count',
        'us_12_5_count',
        'pants_28_count',
        'pants_30_count',
        'pants_32_count',
        'pants_34_count',
        'pants_36_count'
      ];

      let product_sizes_arr = [];
      let p = 0; for(key in product_sizes){p++}
      var numOfProds = p;
      for(let j = 0; j < numOfProds; j++){
        for(let i = 0; i < 19; i++){
          if(product_sizes[j][brand_names[i]]
            && !(product_sizes_arr.indexOf(size_arr[i]) > -1) ){
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
        product_sizes_arr: product_sizes_arr,
        user: req.user,
        cart: cart
      })
    })
    .catch( err => {
      console.log('err: ', err);
    })
})


router.get('/brands/:brand/:product', function(req, res) {
  let brand = req.params.brand;
  let product = req.params.product;
  let conditional_promise;

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  Promise.all([
    hbx_queries.getProductContent(brand,product),
    hbx_queries.getProductSizes(product),
    hbx_queries.getProductColors(product),
    hbx_queries.getAllHBXProducts(),
    hbx_queries.getCategory(product),
    conditional_promise
  ])
    .then( results => {
      let product_content = results[0];
      let product_sizes = results[1];
      let product_colors = results[2];
      let all_hbx_products = results[3];
      let product_category = results[4]
      let cart = results[5];

      let brandNameObj = {
        '11-by-boris-bidjan-saberi': '11 by Boris Bidjan Saberi',
        'tres-bien': 'Tres Bien',
        'adidas-originals': 'Adidas Originals',
        'denim-by-vanquish-fragment': 'Denim by Vanquish & Fragment',
        'mastermind-world': 'Mastermind World',
        'undercover': 'Undercover'
      }

      let product_images_arr = product_content[0].product_images.split(',')

      let size_arr = [
        'S',
        'M',
        'L',
        'XL',
        '8',
        '8.5',
        '9',
        '9.5',
        '10',
        '10.5',
        '11',
        '11.5',
        '12',
        '12.5',
        '28',
        '30',
        '32',
        '34',
        '36'
      ];

      let brand_names = [
        'small_count',
        'medium_count',
        'large_count',
        'xlarge_count',
        'us_8_count',
        'us_8_5_count',
        'us_9_count',
        'us_9_5_count',
        'us_10_count',
        'us_10_5_count',
        'us_11_count',
        'us_11_5_count',
        'us_12_count',
        'us_12_5_count',
        'pants_28_count',
        'pants_30_count',
        'pants_32_count',
        'pants_34_count',
        'pants_36_count'
      ];


      let product_sizes_arr = [];
      for(let i = 0; i < size_arr.length-1; i++){
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
        hbx_product_obj.category = hbx_product_brand[2];

        if( hbx_product_obj.name !== product_name ){
          related_products_arr.push(hbx_product_obj);
        }
      }



      let this_brand_images_arr = []; // this_brand_images_arr will eventually get sent to hbx_product in our response, but first we'll need to populate it with an image, name, and other details from the related_products_arr object.
      let brand_name_string = product_content[0].brand_name;
      let category_id = product_content[0].category_id;
      let product_obj;

      let our_product_name;

      // below we collect all products which share any similar characteristics with our main image
      for(let q = 0; q < related_products_arr.length; q++){

        if(related_products_arr[q] !== undefined
          && related_products_arr[q].images.includes(brand_name_string)
          && related_products_arr[q].category == category_id
          && !(related_products_arr[q].images.includes(product))){

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


      // below we collect every remaining specific brand related product into the this_brand_images_arr.
      for(let i = 0; i < related_products_arr.length; i++){

        if(related_products_arr[i] !== null
          && related_products_arr[i] !== undefined
          && related_products_arr[i].images.includes(brand_name_string)){

          product_obj = {}

          if(related_products_arr[i].images.includes(product)){

            related_products_arr[i].images = null
          } else {
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

      }

      // below we collect every other product besides the primary product into the this_brand_images_arr.
      for(let j = 0; j < related_products_arr.length; j++){

        if(related_products_arr[j] !== null && related_products_arr[j].images !== null){

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
        this_brand_images_arr: this_brand_images_arr,
        user: req.user,
        cart: cart || null,
        product_category: product_category
      })
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })
})

router.get("/hbx_login", function(req, res) {
  res.render('hbx_login')
})

router.post('/hbx_login', passport.authenticate('local', {
   successRedirect: '/store',
   failureRedirect: '/hbx_login',
   failureFlash: true
 })
);

router.get('/hbx_account', function(req, res) {

  if(!req.user){
    res.redirect('error');
  }

  Promise.all([
    hbx_queries.getUserByID(req.user.id),
    hbx_queries.getCartById(req.user.id)
  ])
    .then( results => {
      let user_data = results[0];
      let cart = results[1];
      res.render('hbx_account', {
        user: req.user,
        user_data: user_data,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error');
    })
})

router.get('/hbx_account/password', function(req, res) {

  if(!req.user){
    res.redirect('error');
  }

  Promise.all([
    hbx_queries.getUserByID(req.user.id),
    hbx_queries.getCartById(req.user.id)
  ])
    .then( results => {
      let user_data = results[0];
      let cart = results[1];
      res.render('hbx_change_password', {
        user: req.user,
        user_data: user_data,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })


})

router.get('/hbx_account/address_info', function(req, res) {

  if(!req.user){
    res.redirect('error');
  }

  Promise.all([
    hbx_queries.getUserByID(req.user.id),
    hbx_queries.getCartById(req.user.id)
  ])
    .then( results => {
      let user_data = results[0];
      let cart = results[1];
      res.render('hbx_edit_address', {
        user: req.user,
        user_data: user_data,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })

})

router.get('/hbx_account/orders', function(req, res){
  if(!req.user){
    res.redirect('error');
  }

  hbx_queries.getPreviousOrdersByID(req.user.id)
  .then( (orders) => {
    res.render('hbx_orders', {
      user: req.user,
      orders: orders
    })
  })
  .catch(err => console.log(err))
})

router.post('/edit_address', function(req, res){
  console.log('edit address!');

})

router.get('/hbx_account/close-account', function(req, res) {
  let conditional_promise;
  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_close_account', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })
})

router.get("/hbx_register", function(req, res) {
  if(req.user){
    res.redirect('/hbx_error')
  }

  res.render('hbx_register')
})

router.post("/hbx_register", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try{
    queries.createLocalUser(email, password)
    .then(() => {
      res.status(200).redirect('/hbx_register/success')
    })
  }catch(err){
    console.log(err);
  }
})

router.get("/hbx_shopping_bag", function(req, res) {
  let conditional_promise;
  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_shopping_bag', {
        user: req.user,
        cart: cart
      })
    })
    .catch( err => {
      console.log('err: ',err);
      res.render('hbx_error', {user: req.user});
    })

})

router.get('/hbx_register/success', function(req, res) {
  let conditional_promise;
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_successful_register', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })

})

router.get('/hbx/auth/facebook',
  passport.authenticate('hbx-facebook', {
    scope: ['user_friends', 'manage_pages']
  } ));

router.get('/hbx/auth/facebook/callback',
  passport.authenticate('hbx-facebook', {
    successRedirect: '/store',
    failureRedirect: '/hbx_error',
    failureFlash: true
  })
);

router.get('/hbx/auth/google',
  passport.authenticate('hbx-google', { scope: ['profile','email'] })
);

router.get('/hbx/auth/google/callback',
  passport.authenticate('hbx-google', {
    successRedirect: '/store',
    failureRedirect: '/hbx_error',
    failureFlash: true
  })
);

router.get('/hbx/auth/error', function(req, res){
  let conditional_promise;

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_error', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })
});

router.get('/hbx_error', function(req, res) {
  let conditional_promise;

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_error', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
    })
});

router.get('/hbx_logout', function(req, res) {
  // res.setHeader('Set-Cookie', cookieLib.serialize('userCart', '', {
  //   httpOnly: true,
  //   maxAge: 0
  // }))
  req.logout();
  res.redirect('/store');
})

router.get('/checkout/addressing', function(req, res) {

  let conditional_promise;
  let conditional_promise2;

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)
  req.user ? conditional_promise2 = hbx_queries.getUserByID(req.user.id) : conditional_promise = Promise.resolve(undefined)

  Promise.all([
    conditional_promise,
    conditional_promise2
  ])
    .then( results => {
      let cart = results[0];
      let user_data = results[1];

      if(req.user && !cart.length){
        res.render('hbx_error',{user:req.user, cart:cart})
      } else if(!req.user){
        res.render('hbx_addressing')
      }

      res.render('hbx_addressing', {
        user: req.user,
        cart: cart,
        user_data: user_data
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })

})

router.get('/checkout/complete', function(req, res, next) {
  res.render('hbx_order_complete');
})

router.post('/checkout/complete', function(req, res, next) {

  if(!req.user && !req.body.users_cart[0]){
    res.redirect('/hbx_error');
  }

  let cart = req.body.users_cart

  let order_obj = JSON.parse(req.body.order_obj_value);
  let purchasedProductDetailsArray = [];
  let tot_cost = 0;

  for(let i = 0; i < cart.length; i++){
    let purchased_products_details = new Object();
    purchased_products_details.item_image = cart[i].item_image;
    purchased_products_details.item_quantity = cart[i].item_quantity;
    purchased_products_details.item_individual_price = cart[i].item_individual_price;
    purchased_products_details.item_cost = cart[i].item_cost;
    purchased_products_details.item_color = cart[i].item_color;
    purchased_products_details.item_size = cart[i].item_size;
    purchased_products_details.item_category = cart[i].item_category;
    purchased_products_details.products_id = cart[i].products_id;
    purchased_products_details.item_brand = cart[i].item_brand;
    purchased_products_details.item_route = cart[i].item_route;
    purchasedProductDetailsArray.push(purchased_products_details);
    tot_cost += cart[i].item_cost;
  }

  let users_id = order_obj.users_id || null
  let conditional_promise;

  req.user ? conditional_promise = hbx_queries.clearCartByUserID(order_obj.users_id) : conditional_promise = undefined

  Promise.all([
    hbx_queries.completeOrder(
      req.body.payment_type,
      users_id,
      req.body.shipping_cost,
      order_obj.first_name,
      order_obj.last_name,
      order_obj.phone,
      order_obj.order_email,
      order_obj.street,
      order_obj.city,
      order_obj.postcode,
      order_obj.country,
      order_obj.state,
      order_obj.company_name,
      order_obj.order_notes,
      purchasedProductDetailsArray,
      tot_cost
    ),
    conditional_promise
  ])
  .then( results => {
    if(req.user){
      res.render('hbx_order_complete', {
        user: req.user
      });
    }
    res.json({})
  })
  .catch( err => {
    console.log(err);
    res.render('hbx_error', {user: req.user});
  })

})

router.post('/brands/:brand/:product/add-to-cart', function(req, res) {
  // passport writes an endpoint that handles auth., and passes a cookie for your sessions on requests.
  // fetch does not send that cookie automatically.

  if(!req.user){
    res.status(401).json({status:'error',message:'user is not present on the request object'})
  }

  if(!req.body.product_quantity){
    res.status(401).json({status:'error',message:'cart has no items'})
  }

  hbx_queries.addToCart(
      req.body.item_quantity,
      req.body.item_cost,
      req.body.item_color,
      req.body.item_size,
      req.body.products_id,
      req.user.id,
      req.body.item_category,
      req.body.item_image,
      req.body.item_name,
      req.body.item_individual_price,
      req.body.item_brand,
      req.body.item_route
    )
    .then((cart) => {
      res.json(cart)
    })
    .catch((error) => {
      res.status(401).json({status:'error',message:'item not added to database'})
    })

})

router.get('/get-cart-by-id', function(req, res) {

  let user_id = req.headers.user_id;

  try{
    hbx_queries.getCartById(user_id)
    .then((cart) => {
      res.json(cart);
    })
  }catch(error){
    res.status(401).json({status:'error',message:'cart db retrieval failed' + error.toString()})
  }
})

router.post('/update-bag', function(req, res) {
  let id = req.body.id;
  let item_count = req.body.item_count;
  let item_tot_cost = req.body.item_tot_cost;

  hbx_queries.updateCartById(id, item_count, item_tot_cost)
  .then((results) => {
    res.redirect('/hbx_shopping_bag')
  })
  .catch(err => next(err))
})

router.post('/checkout/delivery_and_payment', function(req, res){
  if(req.body.order_email !== req.body.confirm_order_email){
    res.render('hbx_addressing',{error_message:'emails do not match'})
  }

  let order_obj = new Object();

  order_obj.first_name = req.body.first_name;
  order_obj.last_name = req.body.last_name;
  order_obj.phone = req.body.phone;
  order_obj.order_email = req.body.order_email[0];
  order_obj.street = req.body.street;
  order_obj.city = req.body.city;
  order_obj.postcode = req.body.postcode
  order_obj.state = req.body.state;
  order_obj.country = req.body.country;
  order_obj.company_name = req.body.company_name;
  order_obj.order_notes = req.body.order_notes;

  if(req.user){
    order_obj.users_id = req.user.id;
  } else {
    res.render('hbx_delivery_and_payment',{order_obj:order_obj})
  }

  let conditional_promise;
  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      if(!cart.length){
        console.log('not authorized!');
        res.render('hbx_error',{user:req.user})
      }
      res.render('hbx_delivery_and_payment',{user:req.user, order_obj:order_obj, cart:cart})
    })
    .catch( err => next(err))

})

router.post('/update-profile-in-db', function(req, res){
  let conditional_promise;
  req.user ? conditional_promise = hbx_queries.updateUserProfile(req.body.first_name, req.body.last_name, req.body.phone, req.body.email) : conditional_promise = Promise.resolve(undefined)

  Promise.all([
    conditional_promise,
    hbx_queries.getUserByID(req.user.id)
  ])
  .then( results => {
    let user_data = results[1];

    res.redirect('/hbx_account')
  })
  .catch( err => {
    console.log(err);
    res.render('hbx_error',{error_message:err})
  })
})

router.post('/update-address-in-db/:id', function(req, res){
  let user_id = req.params.id;
  let conditional_promise;
  req.user ? conditional_promise = hbx_queries.updateUserAddress(req.body.street, req.body.city, req.body.state, req.body.postcode, req.body.company, user_id) : conditional_promise = Promise.resolve(undefined)

  Promise.all([
    conditional_promise,
    hbx_queries.getUserByID(req.user.id)
  ])
  .then( results => {
    let user_data = results[1][0];

    res.redirect('/hbx_account/address_info')
  })
  .catch( err => {
    console.log(err);
    res.render('hbx_error',{error_message:err})
  })
})

router.post('/update-password-in-db', function(req, res){
  console.log('1. inside updatep pass!');
  res.redirect('/hbx_error')
  // if(!req.user.password){
  //   res.redirect('/error')
  // }
  //
  // let verify_password = req.body.verify_password;
  // let new_password = req.body.new_password;
  // // let hash;
  //
  // if(verify_password !== new_password){
  //   res.render('hbx_change_password',{message:'new passwords do not match'})
  // }
  //
  // let submitted_current_password = req.body.current_password;
  // let user_email = req.params.email;
  // let user_id = req.params.id;
  //
  // console.log('\n user_email: ',user_email,'\n submitted_current_password: ',submitted_current_password,'\n user_id: ',user_id);
  //
  // // check if our user password checks out
  // queries.comparePassword(user_email, submitted_current_password)
  //   .then( user => {
  //     if(!user){
  //       console.log('password not found');
  //       res.render('hbx_change_password',{message:'incorrect current password'})
  //     }
  //     console.log('2. inside comparePassword');
  //     return user;
  //   })
  //   .then( user => {
  //     console.log('3. user ====> ',user);
  //     bcrypt.hash(password, saltRounds).then(hash => {
  //       hbx_queries.updateUserPassword(hash, user.id)
  //       .then(() => console.log('4. updated!!!'))
  //       .catch((err) => console.log(err))
  //     })
  //     .then(() => console.log('success'))
  //     .catch(err => console.log(err))
  //   })
  //   .catch( err => {
  //     console.log(err);
  //     res.render('hbx_error',{error_message:err})
  //   })




  // if they match then turn password to a hash
  // run updatePassword

  // req.user ? conditional_promise = hbx_queries.updateUserPassword(req.body.new_password, user_id) : conditional_promise = Promise.resolve(undefined)

})




module.exports = router;
