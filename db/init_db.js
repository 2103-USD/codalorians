// code to build and initialize DB goes here
const {
  // other db methods
} = require("./index");
const client = require("./client");

async function buildTables() {
  try {
    client.connect();
    console.log("Dropping tables");
    // drop tables in correct order
    client.query(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS order_products;
    `);
    console.log("Finished dropping tables");
    // build tables in correct order
    console.log("CREATING TABLES");
    client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      "imageURL" VARCHAR(255) DEFAULT "imageUrl here"
      inStock BOOLEAN DEFAULT false,
      category VARCHAR(255) NOT NULL 
      );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) UNIQUE NOT NULL
      isAdmin BOOLEAN DEFAULT false
      );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      status VARCHAR(255) DEFAULT "created",
      "userId" INTEGER REFERENCES users(id),
      "datePlaced" DATE DEFAULT sysdate NOT NULL
      username VARCHAR(255) REFERENCES users(username)
      );

    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id),
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT (0)
      )
    `);

    console.log("Finish building tables");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
