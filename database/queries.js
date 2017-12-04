const {db} = require('./connection.js');
const {bcrypt} = require('./connection.js');
const {saltRounds} = require('./connection.js');

let queries = {

  comparePassword : function(email, password){
    return this.findByEmail(email)
      .then(user => {
        return bcrypt.compare(password, user.password)
      })
  },

  getPosts: function(){
    return db.any("SELECT * FROM posts") // returns a promise, because pgp
  },

  storeComment: function(user_comment, post_id, user_id, user_name){
    return db.any(
      "INSERT INTO comments (comment_text, user_id, post_id, user_name) VALUES ($1,$2,$3,$4)",
      [user_comment, user_id, post_id, user_name])
  },

  getPostComments: function(post_id){
    return db.any("SELECT * FROM comments WHERE post_id = $1", post_id)
  },

  getTopTenByHypeCount: function(){
    return db.any("SELECT * FROM posts ORDER BY post_hype_count DESC LIMIT 10")
  },

  getPost: function(id){
    return db.any("SELECT * FROM posts WHERE id = $1", id)
  },

  createLocalUser: function(email, password){
    return bcrypt.hash(password, saltRounds).then(hash => {
      return db.none(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, hash])
    })
  },

  createUser: function(email){
    return db.oneOrNone(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
    [email])
  },

  find: function(email, password){
    return db.oneOrNone(
      "SELECT * FROM users WHERE users.email = $1",
      [email]
    )
      .then(user => {
        return comparePassword(password, user.password) ? user : false
      })
      .catch(function(err){
        console.log('error: ',err);
      });
  },

  findById: function(id){
    return db.any("SELECT * FROM users WHERE id = $1", [id]);
  },

  findByEmail: function(email){
    return db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
  },

  // findByEmailLocal: function(email){
  //   return db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
  // },

  findByIdGoogle: function(id){
    return db.any("SELECT * FROM google_users WHERE id = $1", [id]);
  },

  findByIdFacebook: function(id){
    return db.any("SELECT * FROM facebook_users WHERE id = $1", [id]);
  },

  // the function below helps with our passport OAUTH apis. If the user is not
  // already in our database we sign them up.
  findOneAndUpdateGh: function(searchAndUpdate){
    return db.oneOrNone(
      "SELECT * FROM google_users WHERE username = $1",
      [searchAndUpdate.name]
    )
      .then( user => {
        if(!user){
          // if user is not found in the users table we add them to our
          // github table
          const result = db.oneOrNone(
            "INSERT INTO google_users (username, profile_id) VALUES ($1, $2) RETURNING *",
            [searchAndUpdate.name, searchAndUpdate.someID]
          );
          return result;
        } else {
          return user;
          // done(null, user)
        }
      }).catch(function(err, user){
        if(err){
          return err;
        }
      }
    );
  },

  findOneAndUpdateFb: function(searchAndUpdate){
    return db.oneOrNone(
      "SELECT * FROM facebook_users WHERE username = $1",
    [searchAndUpdate.name])
      .then( user => {
        if(!user){
          return db.oneOrNone(
            "INSERT INTO facebook_users (username, profile_id) VALUES ($1, $2) RETURNING *",
            [searchAndUpdate.name, searchAndUpdate.someID]);
        } else {
          return user;
        }
      }).catch(function(err, user){
        if(err){
          return err;
        }
      }
    );
  }

}

module.exports = queries;
