const {db} = require('./connection.js');
const {bcrypt} = require('./connection.js');
const {saltRounds} = require('./connection.js');

let queries = {

  getUserByID: function(user_id){
    return db.any("SELECT * FROM users WHERE id = $1", user_id);
  },

  getBrandDetails: function(brand){
    return db.any("SELECT * FROM brands WHERE brand_name_link = $1", brand);
  },

  getInventory: function(brand){
    return db.any("SELECT * FROM products WHERE brand_name = $1", brand);
  },

  getProductContent: function(brand,product){
    return db.any("SELECT * FROM products WHERE brand_name = $1 AND product_name_route = $2",[brand,product]);
  },

  getBrandCategories: function(brand){
    return db.any("SELECT category_type FROM categories JOIN products on products.category_id = categories.id WHERE brand_name = $1", brand);
  },

  getBrandProductColors: function(brand){
    return db.any("SELECT product_colors.color FROM product_colors JOIN products on products.product_color_id = product_colors.id WHERE brand_name = $1", brand);
  },

  getProductColors: function(product){
    return db.any("SELECT product_colors.color FROM product_colors JOIN products on products.product_color_id = product_colors.id WHERE product_name_route = $1", product);
  },

  getBrandPriceRange: function(brand){

    return brandPrices = db.any(
      "SELECT product_price FROM products WHERE brand_name = $1",
      brand)
      .then(brandPrices => {

        const brandPricesArr = [];

        for(let i = 0; i < brandPrices.length; i++){
          brandPricesArr.push(brandPrices[i].product_price);
        }

        const brandPriceRange = brandPricesArr.sort(function(a,b){ return a - b });

        const getSpacing = (arr) => {
          let difference = arr[arr.length-1] - arr[0];
          let spacing;
          let numOfLines;

          if(arr.length < 4){
            spacing = Math.ceil(difference/2);
            numOfLines = 1;
          } else if(arr.length < 8){
            spacing = Math.ceil(difference/3);
            numOfLines = 2;
          } else if(arr.length >= 8){
            spacing = Math.ceil(difference/4);
            numOfLines = 3;
          }

          return createRanges(arr, spacing, numOfLines);
        };

        const createRanges = (arr, spacing, numOfLines) => {
          let ranges = [];

          // below we account for prouct pricing edge cases.
          let arr_tail = arr[arr.length-1];

          if(arr[0] >= 10 && arr_tail <= 50){
            ranges = [ 1, 50 ];
            return ranges;
          }  if(arr[0] >= 10 && arr_tail <= 100){
            ranges = [ 1, 100 ];
            return ranges;
          } else if(arr[0] < 10 && arr_tail <= 50){
            ranges = [ 1, 50 ];
            return ranges;
          } else if(arr[0] < 10 && arr_tail <= 100){
            ranges = [ 1, 100 ];
            return ranges;
          }

          let curr = arr[0];
          // curr will serve as the last element in our ranges array, which
          // we'll use to increment to create our range values.

          ranges.push(curr); // our first element is created in the ranges array.
          spacing += 10;

          let next; // this holds the integer to be added to our ranges array.
          next = curr + spacing;

          let modulo; // will track our modulus difference
          // between 50 and eventually 100.

          // below we ensure our results are rounded to hundredeths.
          if(next % 50 > 0){
            modulo = next % 50;
            next -= modulo;
            next += 50;
          } else if(next % 100 > 0) {
            modulo = next % 100;
            next -= modulo;
            next += 100;
          }

          curr = next;
          ranges.push(curr);
          curr += 1;
          ranges.push(curr);

          for(let i = 0; i < numOfLines; i++){
            next = curr + spacing;
            modulo = next % 100;
            if(modulo > 0){
              next -= modulo;
              next += 100;
            }
            curr = next;
            ranges.push(curr);
            curr += 1;
            ranges.push(curr);

            if(curr > arr[arr.length-1]){
              ranges = ranges.slice(0,ranges.length-1);
                if(ranges[0] % 10 === 0){
                  ranges[0] = ranges[0] - 9;
                }
              return ranges;
            }
          }

          ranges = ranges.slice(0,ranges.length-1);
          if(ranges[0] % 10 === 0){
            ranges[0] = ranges[0] - 9;
          }
          return ranges;

        };

        return getSpacing(brandPriceRange);

      })
      .catch(err => {
        console.log('error: ',err);
        // return next(err);
        // return err;
      });
  },

  getProductCount: function(brand){
    return db.any(`SELECT
      small_count,
      medium_count,
      large_count,
      xlarge_count,
      US_8_count,
      US_8_5_count,
      US_9_count,
      US_9_count,
      US_9_5_count,
      US_10_count,
      US_10_5_count,
      US_11_count,
      US_11_5_count,
      US_12_count,
      US_12_5_count,
      pants_28_count,
      pants_30_count,
      pants_32_count,
      pants_34_count,
      pants_36_count
    from products WHERE brand_name = $1`, brand)
  },

  getProductSizes: function(product){
    return db.any(`SELECT
      small_count,
      medium_count,
      large_count,
      xlarge_count,
      US_8_count,
      US_8_5_count,
      US_9_count,
      US_9_count,
      US_9_5_count,
      US_10_count,
      US_10_5_count,
      US_11_count,
      US_11_5_count,
      US_12_count,
      US_12_5_count,
      pants_28_count,
      pants_30_count,
      pants_32_count,
      pants_34_count,
      pants_36_count
    from products WHERE product_name_route = $1`, product)
  },

  getSortedInventoryDirection: function(brand, direction){
    console.log("----------------> executing sql query for ", direction)
    return db.any(
      "SELECT * FROM products WHERE brand_name = $1 ORDER BY product_name " + direction.toUpperCase(), brand);
  },

  getAllHBXProducts: function(){
    return db.any("SELECT brand_name,product_images,category_id FROM products")
  },

  createHBXLocalUser: function(email, password){
    this.createUser(email);
    return bcrypt.hash(password, saltRounds).then(hash => {
      return db.none(
        "INSERT INTO local_users (email, password) VALUES ($1, $2)",
        [email, hash])
    })
  },

  createHBXUser: function(email){
    return db.oneOrNone(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
    [email])
  },

  addToCart: function(
    item_quantity,
    item_cost,
    item_color,
    item_size,
    products_id,
    users_id,
    item_category,
    item_image,
    item_name,
    item_individual_price,
    item_brand,
    item_route){

    return db.any(
      `INSERT INTO cart (
        item_quantity,
        item_cost,
        item_color,
        item_size,
        products_id,
        users_id,
        item_category,
        item_image,
        item_name,
        item_individual_price,
        item_brand,
        item_route)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    [item_quantity, item_cost, item_color, item_size, products_id, users_id, item_category, item_image, item_name, item_individual_price, item_brand, item_route])
  },

  clearAllCartDataById: function(id){
    return db.none("DELETE FROM cart WHERE users_id = $1", [id])
  },

  addNewOrder: function(){
    return db.none(
      `INSERT INTO orders (
        purchased_at,
        shipped_at,
        address,
        item_quantity,
        item_cost,
        item_color,
        item_size,
        products_id,
        users_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      purchased_at,
      shipped_at,
      address,
      item_quantity,
      item_cost,
      item_color,
      item_size,
      products_id,
      users_id
    ])
  },

  clearAllOrdersDataById: function(id){
    return db.none("DELETE FROM orders WHERE users_id = $1", [id])
  },

  getCartById: function(id){
    return db.any("SELECT * FROM cart WHERE users_id = $1", id)
  },

  getCategory: function(product_name){
    return db.any(`
      SELECT category_type FROM categories
      JOIN products ON categories.id = products.category_id
      WHERE product_name_route = $1`, [product_name])
  },

  updateCartById: function(id, item_count, item_tot_cost){
    return db.any(`UPDATE cart SET item_quantity = $2,
      item_cost = $3 WHERE id = $1`,[id,item_count,item_tot_cost])
  },

  editUserAddress: function(street, city, state, postcode, company, user_id){
    return db.one(`
      UPDATE users SET street = $1,
      city = $2,
      state = $3,
      postcode = $4,
      company = $5
      VALUES ($1, $2, $3, $4, $5) WHERE id = $6`, [
        street,
        city,
        state,
        postcode,
        company,
        user_id
      ])
  },

  getPreviousOrdersByID: function(users_id){
    return db.any("SELECT * FROM orders WHERE users_id = $1", users_id)
  },

  updateUserProfile: function(first_name, last_name, phone, email){
    return db.oneOrNone(`UPDATE users SET first_name = $1,
      last_name = $2,
      phone_number = $3
      WHERE email = $4`,
    [first_name, last_name, phone, email])
  },

  updateUserAddress: function(street, city, state, postcode, company, id){
    return db.oneOrNone(`UPDATE users SET street = $1,
      city = $2,
      state = $3,
      postcode = $4,
      company = $5
      WHERE id = $6`,
    [street, city, state, postcode, company, id])
  },

  updateUserPassword: function(hash, user_id){
    return db.any("UPDATE users SET password = $1 WHERE id = $2",
    [hash, user_id])
  },

  completeOrder: function(
    payment_type,
    users_id,
    shipping_cost,
    first_name,
    last_name,
    phone,
    order_email,
    street,
    city,
    postcode,
    country,
    state,
    company_name,
    order_notes,
    purchasedProductDetailsArray,
    tot_cost
  ){
    return db.any(`INSERT INTO orders (
      payment_type,
      users_id,
      shipping_cost,
      first_name,
      last_name,
      phone,
      order_email,
      street,
      city,
      postcode,
      country,
      state,
      company_name,
      order_notes,
      purchased_product_details_array,
      total_purchase_cost
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`, [
      payment_type,
      users_id,
      shipping_cost,
      first_name,
      last_name,
      phone,
      order_email,
      street,
      city,
      postcode,
      country,
      state,
      company_name,
      order_notes,
      purchasedProductDetailsArray,
      tot_cost
    ])
  },

  clearCartByUserID: function(users_id){
    return db.any("DELETE FROM cart WHERE users_id = $1", users_id)
  }


}

module.exports = queries;
