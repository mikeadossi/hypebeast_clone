let pgp = require('pg-promise')();
let connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
let db = pgp(connectionString);


let queries = {

  getPosts: function(){
    return db.any("SELECT * FROM posts") // returns a promise, because pgp
  },

  getTopTenByHypeCount: function(){
    return db.any("SELECT * FROM posts ORDER BY post_hype_count DESC LIMIT 10")
  },

  getPost: function(id){
    console.log('id ------> ', id)
    return db.any("SELECT * FROM posts WHERE id = $1", id)
  }

}

module.exports = queries;
