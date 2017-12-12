require('dotenv').config();
const express = require('express');
const router = express.Router();
const queries = require('./src/database/queries');
const hbx_queries = require('./src/database/hbx_queries');
const passport = require('./passport');
const bcrypt = require('bcrypt');
const {allProductSizesArr} = require('./src/database/products_data');
const {allProductSizesSingleValueArr} = require('./src/database/products_data');
const {allBrandNamesObj} = require('./src/database/products_data');
const {allProductSizesString} = require('./src/database/products_data');
const {allProductSizesObj} = require('./src/database/products_data');
const {checkPasswordAndDeleteUser} = require('./src/database/util/checkPasswordAndDeleteUser');
const {deleteUserUsingHashAndId} = require('./src/database/util/deleteUserUsingHashAndId');

/************************** Hypebeast (below) *******************************/

router.get('/', (req, res, next) => {

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

router.get('/post/:id', (req, res) => {
  const id = req.params.id;

  Promise.all(
    [
      queries.getPost(id),
      queries.getPostComments(id),
      queries.getPostCommentsWithoutParents(id),
      queries.getPostReplies(id)
    ]
  ).then( results => {
      const post = results[0];
      const all_comments = results[1];
      const allCommentsWithoutParents = results[2];
      const allCommentsWithParents = results[3];

      res.render('post', {
        post: post,
        all_comments: all_comments,
        allCommentsWithParents: allCommentsWithParents,
        allCommentsWithoutParents: allCommentsWithoutParents,
        user: req.user
       })
    })
    .catch( err => {
      console.log('err: ', err);
      res.render('hbx_error', {user: req.user});
    })
})

router.get('/store', (req, res) => {

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

router.get('/register/success', (req, res) => {
  res.render('successful_register', { user: req.user });
})

router.get('/loggedIn', (req, res) => {

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

router.get('/account', (req, res) => {

  if(req.user){
    res.render('account', { user: req.user });
  } else {
    res.render('error')
  }
})

router.get('/account/password', (req, res) => {
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

router.get('/account/close-account', (req, res) => {
  res.render('close_account', { user: req.user });
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {

  const isEmailTaken = (submitted_email, submitted_password) => {
    return queries.isEmailTaken(submitted_email)
      .then(user => {
        if(user){
          throw Error ('user email already taken')
        }
        return {email: submitted_email, password: submitted_password}
      })
  }

  const createNonOauthUser = (userEmailAndPassword) => {
    return queries.createNonOauthUser(userEmailAndPassword.email, userEmailAndPassword.password)
      .then(() => {
        return res.status(200).redirect('/register/success')
      })
  }

  isEmailTaken(req.body.email, req.body.password)
    .then(createNonOauthUser)
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })

})

router.get('/login', (req, res) => {

  res.render('login', {
    user: req.user
   })
})

router.post('/login', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/login',
   failureFlash: true
}));


router.get('/logout', (req, res) => {
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
 (req, res) => {
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
 (req, res) => {
    res.redirect('/');
  }
);

router.get('/auth/error', (req, res) => {
  res.render('error', { user: req.user });
});

router.get('/error', (req, res) => {
  res.render('error', { user: req.user });
});

router.post('/post/post_comment/:id', (req, res) => {
  const user_comment = req.body.user_comment;
  const article_id = req.params.id;
  const user_id = req.user.id;
  const user_name = req.user.username;

  try{
    queries.storeComment(user_comment, user_id, article_id, user_name)
    .then(() => {
      res.status(200).redirect('/post/'+article_id)
    })
  }catch(e){
    console.log(e);
  }
});


router.post('/add-new-username-to-db', (req, res) => {

  const isUsernameAvailable = (username, email) => {
    return queries.isUsernameAvailable(username)
      .then( userPresent => {
        if(!userPresent){
          throw Error ('user email already taken')
        }
        return {username: username, email: email};
      })
      .catch( err => console.log(err) )
  }

  const addNewUsernameToDB = (userObj) => {

    return queries.addNewUsernameToDB(userObj.username, userObj.email)
      .then( user => {
        return user
      })
      .catch(err => console.log(err))
  }

  isUsernameAvailable(req.body.username, req.body.email)
    .then(addNewUsernameToDB)
    .then(user => {
      res.redirect('/account')
    })
    .catch( err => console.log(err))

});

router.post('/post/:post_id/add-comment-to-db', (req, res) => {
  queries.storeComment(
    req.body.user_comment,
    req.body.user_id,
    req.body.post_id,
    req.body.user_name)
    .then( comment => res.json(comment) )
    .catch( err => console.log(err))
});


router.post('/post/:post_id/add-reply-to-db/:comment_id', (req, res) => {
  queries.postReplyCommentToDB(
    req.params.comment_id,
    req.body.new_comment,
    req.body.post_id,
    req.body.user_id,
    req.body.user_name)
    .then( comment => res.json(comment) )
    .catch( err => console.log(err))
});


/**************************** HBX (below) ***********************************/

router.get('/brands/:brand', (req, res) => {

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
        (item,pos) => {
          return categories_arr.indexOf(item) == pos
        });

      colors_arr = colors_arr.filter(
        (item,pos) => {
          return colors_arr.indexOf(item) == pos
        });

      let product_images;
      let store_prod_images = [];

      for(let i = 0; i < product.length; i++){
        product_images = product[i].product_images.replace(/[']+/g, '');
        product_images = product_images.split(",");
        store_prod_images.push(product_images[1]);
        store_prod_images.push(product_images[0]);
      }

      let sizes_shortform_arr = allProductSizesSingleValueArr;

      let sizes_longform_arr = allProductSizesArr;

      let product_sizes_arr = [];
      let p = 0; for(key in product_sizes){p++}
      let numOfProds = p;
      for(let j = 0; j < numOfProds; j++){
        for(let i = 0; i < 19; i++){
          if(product_sizes[j][sizes_longform_arr[i]]
            && !(product_sizes_arr.indexOf(sizes_shortform_arr[i]) > -1) ){
            product_sizes_arr.push( sizes_shortform_arr[i] );
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


router.get('/brands/:brand/:product', (req, res) => {
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

      let brandNameObj = allBrandNamesObj;

      let product_images_arr = product_content[0].product_images.split(',')

      let sizes_shortform_arr = allProductSizesSingleValueArr;

      let sizes_longform_arr = allProductSizesArr;

      let product_sizes_arr = [];
      for(let i = 0; i < sizes_shortform_arr.length-1; i++){
        if(product_sizes[0][sizes_longform_arr[i]]){
          product_sizes_arr.push( sizes_shortform_arr[i] );
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

router.get("/hbx_login", (req, res) => {
  res.render('hbx_login')
})

router.post('/hbx_login', passport.authenticate('local', {
   successRedirect: '/store',
   failureRedirect: '/hbx_login',
   failureFlash: true
 })
);

router.get('/hbx_account', (req, res) => {

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

router.get('/hbx_account/password', (req, res) => {

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

router.get('/hbx_account/address_info', (req, res) => {

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

router.get('/hbx_account/orders', (req, res) => {
  if(!req.user){
    res.redirect('error');
  }

  Promise.all([
    hbx_queries.getPreviousOrdersByID(req.user.id),
    hbx_queries.getCartById(req.user.id)
  ])
  .then( (results) => {
    let orders = results[0];
    let purchased_product_details_array = [];
    for(let i = 0; i < orders.length; i++){
      purchased_product_details_array.push(JSON.parse(orders[0].purchased_product_details_array)[0]);
    }
    res.render('hbx_orders', {
      user: req.user,
      orders: orders,
      purchased_product_details_array: purchased_product_details_array,
      cart: results[1]
    })
  })
  .catch(err => console.log(err))
})

router.get('/hbx_account/close-account', (req, res) => {
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


router.delete('/hbx_account/close-account', (req, res) => {
  if(!req.user){
    res.redirect('/hbx-error');
  }

  checkPasswordAndDeleteUser(req.body.user_password, process.env.SALTROUNDS, req.body.user_id)
    .then(deleteUserUsingHashAndId)
    .then(response => res.json(response))
    .catch( err => {
      console.log(err);
      res.render('hbx_error', {user: req.user});
    })
})


router.get("/hbx_register", (req, res) => {
  if(req.user){
    res.redirect('/hbx_error')
  }

  res.render('hbx_register')
})

router.post("/hbx_register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try{
    queries.createNonOauthUser(email, password)
    .then(() => {
      res.status(200).redirect('/hbx_register/success')
    })
  }catch(err){
    console.log(err);
  }
})

router.get("/hbx_shopping_bag", (req, res) => {
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

router.get('/hbx_register/success', (req, res) => {
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

router.get('/hbx/auth/error', (req, res) => {
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

router.get('/hbx_error', (req, res) => {
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

router.get('/hbx_logout', (req, res) => {
  req.logout();
  res.redirect('/store');
})

router.get('/checkout/addressing', (req, res) => {

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

router.get('/checkout/complete', (req, res, next) => {
  res.render('hbx_order_complete');
})

router.post('/checkout/complete', (req, res, next) => {

  if(!req.user && !req.body.users_cart[0]){
    res.redirect('/hbx_error');
  }

  let cart;

  typeof req.body.users_cart === 'string'
    ? cart = JSON.parse(req.body.users_cart)
    : cart = req.body.users_cart;

  let order_obj = JSON.parse(req.body.order_obj_value);
  order_obj.phone = JSON.parse(order_obj.phone)
  order_obj.postcode = JSON.parse(order_obj.postcode)
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
    purchased_products_details.item_name = cart[i].item_name;
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
      JSON.stringify(purchasedProductDetailsArray),
      tot_cost
    ),
    conditional_promise
  ])
  .then( results => {
    if(req.user){
      res.render('hbx_order_complete', {
        user: req.user
      });
    };

    res.render('hbx_order_complete');
  })
  .catch( err => {
    console.log(err);
    res.render('hbx_error', {user: req.user});
  })

})

router.post('/brands/:brand/:product/add-to-cart', (req, res) => {
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
      req.body.item_route,
      req.body.item_color_type
    )
    .then((cart) => {
      res.json(cart)
    })
    .catch((error) => {
      res.status(401).json({status:'error',message:'item not added to database'})
    })

})

router.get('/get-cart-by-id', (req, res) => {

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

router.post('/update-bag', (req, res) => {
  let id = req.body.id;
  let item_count = req.body.item_count;
  let item_tot_cost = req.body.item_tot_cost;

  hbx_queries.updateCartById(id, item_count, item_tot_cost)
  .then((results) => {
    // res.redirect('/hbx_shopping_bag')
    return;
  })
  .catch(err => next(err))
})

router.post('/checkout/delivery_and_payment', (req, res) => {
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

router.post('/update-profile-in-db', (req, res) => {
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

router.post('/update-address-in-db/:id', (req, res) => {
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

router.get('/brands/:brand/filter/*', (req, res) => {

  let params_array = req.params[0].split('/');
  let brand_name = req.params.brand;

  const no_duplicates = (array) => {
    let seen = {};
    return array.filter( item => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  params_array = no_duplicates(params_array);

  let conditional_promise;
  req.user ? conditional_promise = hbx_queries.getCartById(req.user.id) : conditional_promise = Promise.resolve(undefined)

  Promise.all([
    hbx_queries.filterSortDB(brand_name, params_array),
    conditional_promise,
    hbx_queries.getBrandCategories(brand_name),
    hbx_queries.getBrandProductColors(brand_name),
    hbx_queries.getBrandPriceRange(brand_name),
    hbx_queries.getProductCount(brand_name),
    hbx_queries.getBrandDetails(brand_name),
    hbx_queries.getInventory(brand_name)
  ])
  .then( results => {

    let sorted_products = results[0];
    let cart = results[1];
    let categories = results[2];
    let colors = results[3];
    let ranges = results[4];
    let product_sizes = results[5];
    let brand = results[6];
    let inventory = results[7];

    let categories_arr = [];
    for(let i = 0; i < categories.length; i++){
      categories_arr.push(categories[i].category_type);
    }

    let colors_arr = [];
    for(let i = 0; i < colors.length; i++){
      colors_arr.push(colors[i].color);
    }

    categories_arr = categories_arr.filter(
      (item,pos) => {
        return categories_arr.indexOf(item) == pos
      });

    colors_arr = colors_arr.filter(
      (item,pos) => {
        return colors_arr.indexOf(item) == pos
      });

    let product_images;
    let store_prod_images = [];

    for(let i = 0; i < sorted_products.length; i++){
      product_images = sorted_products[i].product_images.replace(/[']+/g, '');
      product_images = product_images.split(",");
      store_prod_images.push(product_images[0]);
      store_prod_images.push(product_images[1]);
    }

    let size_arr = allProductSizesSingleValueArr;

    let brand_names = allProductSizesArr;

    let product_sizes_arr = [];
    let p = 0; for(key in product_sizes){p++}
    let numOfProds = p;
    for(let j = 0; j < numOfProds; j++){
      for(let i = 0; i < 19; i++){
        if(product_sizes[j][brand_names[i]]
          && !(product_sizes_arr.indexOf(size_arr[i]) > -1) ){
          product_sizes_arr.push( size_arr[i] );
        }
      }
    }

    let selected_sizes_array = [];
    const getKeyByValue = (object, value) => {
      return Object.keys(object).find(key => object[key] === value);
    }

    params_array.forEach((val) => {
      if(getKeyByValue(allProductSizesObj, val)){
        selected_sizes_array.push(getKeyByValue(allProductSizesObj, val));
      }
    })

    res.render('hbx_store',{
      brand: brand,
      product: sorted_products,
      user: req.user,
      cart: cart,
      categories_arr: categories_arr,
      colors_arr: colors_arr,
      store_prod_images: store_prod_images,
      price_range_arr: ranges,
      product_sizes_arr: product_sizes_arr,
      selected_items_array: params_array,
      selected_sizes_array: selected_sizes_array
    })
  })
  .catch( err => console.log(err))
})


router.delete('/remove-cart-item/:id', (req, res) => {
  hbx_queries.removeCartItemByID(req.params.id)
  .then( () => {
    return;
  })
  .catch( err => console.log(err))
})


router.post('/update-password-in-db', (req, res) => {
  console.log('called route!');
  if(!req.user.password){
    res.redirect('/hbx_error')
  }

  let current_password = req.body.current_password;
  let new_password = req.body.new_password;
  let user = JSON.parse(req.body.user);

  queries.comparePassword(user.email, current_password)
    .then( user => {
      if(!user){
        res.render('hbx_change_password',{message:'incorrect current password'})
      }
      return user;
    })
    .then( user => {
      bcrypt.hash(new_password, process.env.SALTROUNDS).then( hash => {
        let userId = JSON.parse(req.body.user).id;
        hbx_queries.updateUserPassword(hash, userId)
          .then(() => {
            return;
          })
          .catch((err) => console.log(err))
      })
      .then(() => console.log('success'))
      .catch(err => console.log(err))
    })
    .catch( err => {
      console.log(err);
      res.render('hbx_error',{error_message:err})
    })

})




module.exports = router;
