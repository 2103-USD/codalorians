const { Client } = require("pg");
const CONNECTION_STRING = "postgres://localhost:5432/shop-db"
const client = new Client(CONNECTION_STRING);

module.exports = client;