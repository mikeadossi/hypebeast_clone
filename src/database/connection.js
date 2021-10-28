/* global process, module */
const pgp = require("pg-promise")();
const connectionString = process.env.DATABASE_URL + `?ssl=true`;
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
