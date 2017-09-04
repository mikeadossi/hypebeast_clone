let pgp = require('pg-promise')();
let connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
let db = pgp(connectionString);


let queries = {

  getPosts: function(){
    return db.any("SELECT * FROM posts") // returns a promise, because pgp
  }

}

module.exports = queries;
