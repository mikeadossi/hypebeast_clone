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
  }

}

module.exports = queries;
