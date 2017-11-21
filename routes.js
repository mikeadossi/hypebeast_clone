const express = require('express');
const router = express.Router();
const queries = require('./database/queries');
const hbx_queries = require('./database/hbx_queries');
const passport = require('./passport');

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

// router.get('/hbx_store/:id', function(req, res) {
//   const id = req.params.id;
//
//   // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
//   // cart = JSON.parse(cart);
//
//   queries.getPost(id)
//     .then( brand => {
//       res.render('hbx_brand', {
//         brand: brand,
//         user: req.user
//         // cart: cart || 0
//        })
//     })
//     .catch( err => {
//       console.log('err: ', err);
//     })
// })

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


  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

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

  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

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
    queries.createLocalUser(email, password)
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

// router.post('/login', passport.authenticate('local'),
// (req, res) => {
//
//   let user_id = req.user.id;
//   hbx_queries.getCartById(user_id)
//   .then(cart => {
//     res.setHeader('Set-Cookie', cookieLib.serialize('userCart', JSON.stringify(cart), {
//       httpOnly: true,
//       maxAge: Infinity
//     }))
//
//     res.redirect('/')
//   })
//   .catch( (err) => {
//     console.log('error: ',err);
//     res.redirect('/login')
//   })
// })

router.get('/logout', function(req, res) {
  // clear cookies
  // res.setHeader('Set-Cookie', cookieLib.serialize('userCart', '', {
  //   httpOnly: true,
  //   maxAge: 0
  // }))
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

  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

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

// router.get('/brands/:brand?sort=desc', function(req, res) {
// })
//
// router.get('/brands/:brand?sort=asc', function(req, res) {
// })


router.get('/brands/:brand/:product', function(req, res) {
  let brand = req.params.brand;
  let product = req.params.product;
  let conditional_promise;

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);
  // console.log('cart$ ---> ',cart);

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
          // console.log('our_product_name => ',our_product_name);
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
          && related_products_arr[i].images.includes(brand_name_string) /*&& !(related_products_arr[i].images.includes(product))*/ ){

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
        cart: cart,
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

// router.post('/hbx_login', passport.authenticate('local'),
// (req, res) => {
//
//   let user_id = req.user.id;
//   hbx_queries.getCartById(user_id)
//   .then(cart => {
//     res.setHeader('Set-Cookie', cookieLib.serialize('userCart', JSON.stringify(cart), {
//       httpOnly: true,
//       maxAge: Infinity
//     }))
//
//     res.redirect('/store')
//   })
//   .catch( (err) => {
//     console.log('error: ',err);
//     res.redirect('/hbx_login')
//   })
// })

router.get('/hbx_account', function(req, res) {
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);
  let conditional_promise;

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_account', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })
})

router.get('/hbx_account/password', function(req, res) {
  if(req.user){
    // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
    // cart = JSON.parse(cart);
    let conditional_promise;
    req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

    conditional_promise
      .then( cart => {
        res.render('hbx_change_password', {
          user: req.user,
          cart: cart
        });
      })
      .catch( err => {
        console.log(err);
        res.render('hbx_error', {user: req.user});
      })

  }
})

router.get('/hbx_account/close-account', function(req, res) {
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);
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
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

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
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

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
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

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
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_addressing', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })


})














router.post('/submit-address', function(req, res){
  // here we'll need to submit the address page contents to the db!
  if(req.body.order_email[0] !== req.body.order_email[1]){
    console.log('emails do not match');
    return;
  }

  console.log('\n req.body ===> ',req.body,'\n');

  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let phone = req.body.phone;
  let order_email = req.body.order_email[0];
  let street = req.body.street;
  let city = req.body.city;
  let postcode = req.body.postcode
  let state = req.body.state;
  let country = req.body.country;
  let company_name = req.body.company_name;
  let order_notes = req.body.order_notes;

  hbx_queries.submitOrderAddressDetails(
    first_name,
    last_name,
    phone,
    order_email,
    street,
    city,
    postcode,
    state,
    country,
    company_name,
    order_notes
  )
  .then( cart => {
    res.redirect('/checkout/delivery_and_payment');
  })
  .catch( err => {
    console.log(err);
  })

})







router.get('/checkout/delivery_and_payment', function(req, res) {
  let conditional_promise;
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_delivery_and_payment', {
        user: req.user,
        cart: cart
      });
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })

})

router.get('/checkout/complete', function(req, res) {
  let conditional_promise;
  // let cart = cookieLib.parse(req.headers.cookie).userCart || '[]';
  // cart = JSON.parse(cart);

  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  conditional_promise
    .then( cart => {
      res.render('hbx_order_complete', {
        user: req.user,
        cart: cart
      });
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

  try{
    hbx_queries.addToCart(
      req.body.product_quantity,
      req.body.product_cost,
      req.body.product_color,
      req.body.product_size,
      req.body.product_id,
      req.user.id,
      req.body.product_category,
      req.body.product_image,
      req.body.product_name,
      req.body.product_individual_price
    )
    .then((cart) => {
      return cart;
      // res.status(200).redirect('/hbx_register/success')
    })
  }catch(error){
    res.status(401).json({status:'error',message:'item not added to database'})
    return;
  }

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
  let item_id = req.body.item_id;
  let item_count = req.body.item_count;
  let item_tot_cost = req.body.item_tot_cost;

  hbx_queries.updateCartById(item_id, item_count, item_tot_cost)
  .then((results) => {
    res.redirect('/hbx_shopping_bag')
  })
  .catch(err => next(err))
})





module.exports = router;
