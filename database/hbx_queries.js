let pgp = require('pg-promise')();
let connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
let db = pgp(connectionString);
const bcrypt = require('bcrypt');
const saltRounds = 10;

// const comparePassword = function(password, dbPassword){
//   if(!dbPassword) reject('No user of that name exists!')
//   return bcrypt.compare(password, dbPassword)
//     .then(function(res) {
//       return resolve(res)
//     })
// };

let queries = {

  getStoreContent: function(id){
    return db.any("SELECT * FROM brands WHERE id = $1", id) // returns a promise, because pgp
  },

  getProductContent: function(id){
    return db.any("SELECT * FROM products WHERE id = $1", id)
  },

  getSpecificProduct: function(id){
    return db.any("SELECT * FROM products WHERE id = $1", id)
  }

  // getTopTenByHypeCount: function(){
  //   return db.any("SELECT * FROM posts ORDER BY post_hype_count DESC LIMIT 10")
  // },
  //
  // getPost: function(id){
  //   return db.any("SELECT * FROM posts WHERE id = $1", id)
  // },
  //
  // insertUser: function(email, password){
  //   return db.none("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password])
  // },
  //
  // createUser: function(email, password){
  //   return bcrypt.hash(password, saltRounds).then(hash => {
  //     queries.insertUser(email, hash)
  //       .then(result => {
  //         console.log('hash: ',hash);
  //       })
  //       .catch(err => {
  //         console.log('error: ',err);
  //         return next(err);
  //       })
  //   })
  // },
  //
  // find: function(email, password){
  //   return db.oneOrNone("SELECT * FROM users WHERE users.email = $1", [email])
  //     .then(user => {
  //       return comparePassword(password, user.password) ? user : false
  //     })
  //     .catch(function(err){
  //       console.log('error: ',err);
  //     });
  // },
  //
  // findById: function(id){
  //   return db.any("SELECT * FROM users WHERE id = $1", [id]);
  // },
  //
  // // the function below helps with our passport OAUTH apis. If the user is not already in our database we sign them up.
  // findOneAndUpdateGh: function(searchAndUpdate){
  //   return db.oneOrNone("SELECT * FROM google_users WHERE username = $1", [searchAndUpdate.name])
  //     .then( user => {
  //       if(!user){
  //         // if user is not found in the users table we add them to our github table
  //         return db.oneOrNone("INSERT INTO google_users (username, profile_id) VALUES ($1, $2) RETURNING *", [searchAndUpdate.name, searchAndUpdate.someID]);
  //       } else {
  //         return user;
  //         // done(null, user)
  //       }
  //     }).catch(function(err, user){
  //       if(err){
  //         return err;
  //       }
  //     }
  //   );
  // },
  //
  // findOneAndUpdateFb: function(searchAndUpdate){
  //   return db.oneOrNone("SELECT * FROM facebook_users WHERE username = $1", [searchAndUpdate.name])
  //     .then( user => {
  //       if(!user){
  //         return db.oneOrNone("INSERT INTO facebook_users (username, profile_id) VALUES ($1, $2) RETURNING *", [searchAndUpdate.name, searchAndUpdate.someID]);
  //       } else {
  //         return user;
  //       }
  //     }).catch(function(err, user){
  //       if(err){
  //         return err;
  //       }
  //     }
  //   );
  // }

}

module.exports = queries;
