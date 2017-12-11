/* global process, module */
const pgp = require("pg-promise")();
const connectionString = `postgres://${process.env.USER}@localhost:5432/hypebeast_clone_db`;
const db = pgp(connectionString);

const knex = require("knex")({
  client: "pg",
  connection: connectionString,
  searchPath: ["knex", "public"],
});

module.exports = {
  db,
  knex
};
