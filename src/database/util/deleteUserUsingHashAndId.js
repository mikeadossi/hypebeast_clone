/* global module */
const hbx_queries = require("../hbx_queries");

const deleteUserUsingHashAndId = (passwordInfo) => {
  return hbx_queries.closeHBXAccount(passwordInfo.id, passwordInfo.hashedPassword)
    .then(() => {
      return {};
    });
};

module.exports = {
  deleteUserUsingHashAndId
};
