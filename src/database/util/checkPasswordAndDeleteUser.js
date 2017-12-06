const checkPasswordAndDeleteUser = (password, salt, user_id) => {
  return bcrypt.hash(password, salt)
    .then(hash => {
      return {id: user_id, hashedPassword: hash}
    })
}

module.exports = {
  checkPasswordAndDeleteUser
}
