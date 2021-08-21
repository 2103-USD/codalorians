const { Client } = require("pg");
const connection_string = process.env.DB_URL || "postgres://localhost:5432/shop-db";
const client = new Client(connection_string);

module.exports = client;
