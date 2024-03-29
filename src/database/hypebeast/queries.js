/* global module, console, process */

require("dotenv").config();
const {db} = require("../connection.js");
const bcrypt = require("bcryptjs");
const fs = require("fs");


let queries = {

  comparePassword : function(email, password) {
    return this.findByEmail(email)
      .then(user => {
        return bcrypt.compare(password, user.password);
      });
  },

  comparePasswordWithID : function(id, password) {
    return this.findById(id)
      .then(user => {
        return bcrypt.compare(password, user[0].password);
      });
  },

  getPosts: function() {
    return db.any("SELECT * FROM posts"); // returns a promise, because pgp
  },

  storeComment: function(
    user_comment,
    user_id,
    post_id,
    user_name,
    user_avatar,
    user_avatar_background_color
  ) {
    return db.any(
      `INSERT INTO comments
      (
        comment_text,
        user_id,
        post_id,
        user_name,
        user_avatar,
        user_avatar_background_color
      ) VALUES (
        $1,$2,$3,$4,$5,$6
      ) RETURNING *`,
      [user_comment, user_id, post_id, user_name, user_avatar, user_avatar_background_color]);
  },

  getPostComments: function(post_id) {
    return db.any("SELECT * FROM comments WHERE post_id = $1", post_id);
  },

  getPostCommentsWithoutParents: function(post_id) {
    return db.any(`
      SELECT * FROM comments
      WHERE (parent_comment_id IS NULL AND post_id = $1)
      ORDER BY id ASC
      `, [post_id]);
  },

  getPostReplies: function(post_id) {
    return db.any(`
      SELECT * FROM comments
      WHERE (parent_comment_id IS NOT NULL AND post_id = $1)
      ORDER BY id ASC
      `, [post_id]);
  },

  getTopTenByHypeCount: function() {
    return db.any("SELECT * FROM posts ORDER BY post_hype_count DESC LIMIT 10");
  },

  getPost: function(id) {
    return db.any("SELECT * FROM posts WHERE id = $1", id);
  },

  createNonOauthUser: function(email, password) {
    return bcrypt.hash( password, JSON.parse(process.env.SALTROUNDS) )
      .then( hash => {
        return db.any(
          `INSERT INTO users (email, password)
          VALUES ($1, $2)
          RETURNING id
          `,[email, hash]);
      })
      .then( user_id => {

        let id = user_id[0].id;
        return this.setAvatar(id);

      });
  },

  createUser: function(email) {

    let pathToAvatarDirectory = "./src/public/images/hypebeast_images/avatars/png";
    let avatarImagesArray = [];
    fs.readdirSync(pathToAvatarDirectory).forEach(fileName => {
      avatarImagesArray.push(fileName);
    });
    let randomIndex = Math.floor(Math.random() * (avatarImagesArray.length - 0)) + 0;
    let userImage = "/images/hypebeast_images/avatars/png/" + avatarImagesArray[randomIndex];

    const getRandomColor = () => {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    let userImageBackgroundColor = getRandomColor();

    return db.oneOrNone(`
      INSERT INTO users (email, user_avatar, user_avatar_background_color)
      VALUES ($1, $2, $3)
      RETURNING *
    `,[email, userImage, userImageBackgroundColor]
    );
  },

  find: function(email, password) {
    return db.oneOrNone(
      "SELECT * FROM users WHERE users.email = $1",
      [email]
    )
      .then(user => {
        return this.comparePassword(password, user.password) ? user : false;
      })
      .catch( err => {
        console.log("error: ",err);
      });
  },

  findById: function(id) {
    return db.any("SELECT * FROM users WHERE id = $1", [id]);
  },

  findByEmail: function(email) {
    return db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
  },

  isEmailTaken: function(email) {
    return db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
  },

  findByIdGoogle: function(id) {
    return db.any("SELECT * FROM google_users WHERE id = $1", [id]);
  },

  findByIdFacebook: function(id) {
    return db.any("SELECT * FROM facebook_users WHERE id = $1", [id]);
  },

  // the function below helps with our passport OAUTH apis. If the user is not
  // already in our database we sign them up.
  findOneAndUpdateGh: function(searchAndUpdate) {
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
      }).catch( (err) => {
        if(err){
          return err;
        }
      }
      );
  },

  findOneAndUpdateFb: function(searchAndUpdate) {
    return db.oneOrNone(
      "SELECT * FROM facebook_users WHERE username = $1",
      [searchAndUpdate.name])
      .then( user => {
        if(!user){
          return db.oneOrNone(`
            INSERT INTO facebook_users (username, profile_id)
            VALUES ($1, $2)
            RETURNING *
            `,[searchAndUpdate.name, searchAndUpdate.someID]);
        } else {
          return user;
        }
      }).catch( (err) => {
        if(err){
          return err;
        }
      }
      );
  },

  addNewUsernameToDB: function(newUsername, email) {
    return db.any(`
      UPDATE users SET username = $1
      WHERE email = $2 RETURNING *
      `,[newUsername, email]);
  },

  isUsernameAvailable: function(username) {
    return db.any("SELECT * FROM users WHERE username = $1", username);
  },

  postReplyCommentToDB: function(parentCommentId, newComment, post_id, user_id, user_name, user_avatar, user_avatar_background_color) {
    return db.any(`
      INSERT INTO comments (
        comment_text,
        parent_comment_id,
        post_id,
        user_id,
        user_name,
        user_avatar,
        user_avatar_background_color)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,[newComment, parentCommentId, post_id, user_id, user_name, user_avatar, user_avatar_background_color]);
  },

  setAvatar: function(id) {

    let pathToAvatarDirectory = "./src/public/images/hypebeast_images/avatars/png";
    let avatarImagesArray = [];
    fs.readdirSync(pathToAvatarDirectory).forEach(fileName => {
      avatarImagesArray.push(fileName);
    });
    let randomIndex = Math.floor(Math.random() * (avatarImagesArray.length - 0)) + 0;
    let userImage = "/images/hypebeast_images/avatars/png/" + avatarImagesArray[randomIndex];

    const getRandomColor = () => {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    let userImageBackgroundColor = getRandomColor();

    return db.any(`
      UPDATE users
      SET user_avatar = $1,
      user_avatar_background_color = $2
      WHERE id = $3
    `,[userImage, userImageBackgroundColor, id]
    );

  },

  deleteUserById: function(id) {
    return db.none("DELETE FROM users WHERE id = $1", [id]);
  }

};

module.exports = queries;
