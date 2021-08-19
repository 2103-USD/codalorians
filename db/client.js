// Connect to DB
const { Client } = require("pg");

const CONGO = "shop-db";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5000/${CONGO}`;
const client = new Client(DB_URL);

module.exports = client;
