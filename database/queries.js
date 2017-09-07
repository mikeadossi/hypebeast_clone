let pgp = require('pg-promise')();
let connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
let db = pgp(connectionString);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const comparePassword = function(password, dbPassword){
  if(!dbPassword) reject('No user of that name exists!')
  console.log('password ====> ',password);
  return bcrypt.compare(password, dbPassword)
    .then(function(res) {
      console.log('compared!');
      return resolve(res)
    })
};

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
  },

  insertUser: function(email, password){
    return db.none("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password])
  },

  createUser: function(email, password){
    return bcrypt.hash(password, saltRounds).then(hash => {
      queries.insertUser(email, hash)
        .then(result => {
          console.log('hash: ',hash);
        })
        .catch(err => {
          console.log('error: ',err);
          return next(err);
        })
    })
  },

  find: function(email, password){
    console.log('inside find query!');
    return db.oneOrNone("SELECT * FROM users WHERE users.email = $1", [email])
      .then(user => {
        return comparePassword(password, user.password) ? user : false
      })
      .catch(function(err){
        console.log('error: ',err);
      });
  },

  findById: function(id){
    return db.any("SELECT * FROM users WHERE id = $1", [id]);
  }

}

module.exports = queries;
