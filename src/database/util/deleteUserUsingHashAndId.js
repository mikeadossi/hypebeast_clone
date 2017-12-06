const deleteUserUsingHashAndId = (passwordInfo) => {
  return hbx_queries.closeHBXAccount(passwordInfo.id, passwordInfo.hashedPassword)
    .then(() => {
      return {};
    })
}

module.exports = {
  deleteUserUsingHashAndId
}
