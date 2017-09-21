let pgp = require('pg-promise')();
let connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
let db = pgp(connectionString);
const bcrypt = require('bcrypt');
const saltRounds = 10;

let queries = {

  getBrandDetails: function(key){
    return db.any("SELECT * FROM brands WHERE brand_name_link = $1", key);
  },

  getInventory: function(key){
    return db.any("SELECT * FROM products WHERE brand_name = $1", key);
  },

  getProductContent(brand,product){
    return db.any("SELECT * FROM products WHERE brand_name = $1 AND product_name_route = $2",[brand,product]);
  }

}

module.exports = queries;
