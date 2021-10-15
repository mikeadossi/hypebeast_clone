/* global module */

const hbx_queries = require("../hbx/hbx_queries");
const bcrypt = require("bcryptjs");

const comparePasswordAndDeleteUser = (user_id, submittedPassword) => {

  return hbx_queries.getUserPassword(user_id)
    .then( passwordObj => {

      let password = passwordObj["password"];

      return new Promise((resolve, reject) =>
        bcrypt.compare(submittedPassword, password, (err, res) => {

          if(res){
            hbx_queries.closeAccountById(user_id);
            return resolve("completed");
          } else {
            return reject("incorrect submitted password");
          }

        })
      );
    })
    .catch( err => {
      return Promise.reject(err);
    });
};

module.exports = {
  comparePasswordAndDeleteUser
};
