const hbx_queries = require("../hbx/hbx_queries");
const bcrypt = require("bcrypt");

const comparePasswordAndDeleteUser = (user_id, submittedPassword) => {

 return hbx_queries.getUserPassword(user_id)
   .then( passwordObj => {

     let password = passwordObj["password"];

// New Code

  return new Promise((resolve, reject) =>
     bcrypt.compare(submittedPassword, password, (err, res) => {

       if(res){
         hbx_queries.closeAccountById(user_id);
         return resolve("completed");
        //  return resolve(hbx_queries.closeAccountById(user_id));
          //  return hbx_queries.closeAccountById(user_id);
       } else {
         console.log('else: ',err);
         return reject("incorrect submitted password");
       }

       return result ? resolve() : reject("incorrect submitted password");
     })
   )
  })
  //  .then( result => {
  //    console.log('inside then: ',result);
  //    return Promise.resolve();
  //  })
   .catch( err => {
     console.log('in catch: ',err);
     return Promise.reject(err);
    //  return q.reject(err);
   });
}



module.exports = {
 comparePasswordAndDeleteUser
};
