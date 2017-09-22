let pgp = require('pg-promise')();
let connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
let db = pgp(connectionString);
const bcrypt = require('bcrypt');
const saltRounds = 10;

let queries = {

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

          let curr = arr[0]; // curr will serve as the last element in our ranges array, which we'll use to increment to create our range values.

          ranges.push(curr); // our first element is created in the ranges array.
          spacing += 10;

          let next; // this holds the integer to be added to our ranges array.
          next = curr + spacing;

          let modulo; // will track our modulus difference between 50 and eventually 100.

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
        return next(err);
      });
  },

  getProductCount: function(brand){
    return db.any("SELECT small_count,medium_count,large_count,xlarge_count,US_8_count,US_8_5_count,US_9_count,US_9_count,US_9_5_count,US_10_count,US_10_5_count,US_11_count,US_11_5_count,US_12_count,US_12_5_count,pants_28_count,pants_30_count,pants_32_count,pants_34_count,pants_36_count from products WHERE brand_name = $1", brand)
  }

}

module.exports = queries;
