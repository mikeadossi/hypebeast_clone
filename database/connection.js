const pgp = require('pg-promise')();
const connectionString = `postgres://${process.env.USER}@localhost:5432/comment_system_db`;
const db = pgp(connectionString);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const knex = require('knex')({
 client: 'pg',
 connection: connectionString,
 searchPath: ['knex', 'public'],
});

module.exports = {
  db,
  bcrypt,
  saltRounds,
  knex
}
