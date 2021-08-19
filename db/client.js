<<<<<<< HEAD
const { Client } = require("pg");
const DB = "shob-db";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB}`;
=======
// Connect to DB
const { Client } = require("pg");

const CONGO = "shop-db";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5000/${CONGO}`;
>>>>>>> 9650d1ccf7ea6730fb3426518b4797b7694cc404
const client = new Client(DB_URL);

module.exports = client;