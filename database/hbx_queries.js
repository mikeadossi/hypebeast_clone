let pgp = require('pg-promise')();
let connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
let db = pgp(connectionString);
const bcrypt = require('bcrypt');
const saltRounds = 10;

let queries = {

  getStoreContent: function(id){
    return db.any("SELECT * FROM brands WHERE id = $1", id)
  },

  getProductContent: function(id){
    return db.any("SELECT * FROM products WHERE brand_id = $1", id)
  },

  getSpecificProduct: function(id){
    return db.any("SELECT * FROM products WHERE id = $1", id)
  }

}

module.exports = queries;
