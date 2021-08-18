const { Client } = require("pg");
const DB = "shob-db";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB}`;
const client = new Client(DB_URL);

module.exports = client;