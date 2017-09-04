require('dotenv').config()
const express = require('express')
console.log(process.env.SECRET_KEY);
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const routes = require('./routes.js')
const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})


module.exports = app

app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
