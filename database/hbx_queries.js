let pgp = require('pg-promise')();
let connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
let db = pgp(connectionString);
const bcrypt = require('bcrypt');
const saltRounds = 10;

let queries = {

  getStoreContent: function(key){
    return db.any("SELECT * FROM brands WHERE brand_name_link = $1", key)
  },

  getProductContent: function(key){
    return db.any("SELECT * FROM products WHERE brand_name = $1", key)
  },

  getSpecificProduct: function(id){
    return db.any("SELECT * FROM products WHERE id = $1", id)
  }

}

module.exports = queries;
