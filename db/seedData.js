const client = require("./client");
const { createProduct } = require("./products");
const { createUser } = require("./users");

const {
  seedProducts,
  seedReviews,
  seedOrders,
  seedOrderProducts,
  seedUsers,
} = require("./seeddata.json");
const { createOrder } = require("./orders");
const { createReview } = require("./reviews");
const { createOrderProduct } = require("./order_products");

async function dropTables() {
  try {
    console.log("DROPPING TABLES");
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    `);
    console.log("TABLES DROPPED");
  } catch (Error) {
    throw Error;
  }
}

async function buildTables() {
  try {
    console.log("CREATING TABLES");
    await client.query(`
    CREATE TABLE products(
      id           SERIAL PRIMARY KEY,
      name         VARCHAR(255) NOT NULL,
      artist        VARCHAR(255) NOT NULL,
      description  TEXT NOT NULL,
      price        MONEY NOT NULL,
      imageurl     TEXT DEFAULT 'https://image.flaticon.com/icons/png/512/2827/2827585.png',
      instock      BOOLEAN NOT NULL DEFAULT false,
      category     VARCHAR(255) NOT NULL
      );

    CREATE TABLE users (
      id          SERIAL PRIMARY KEY,
      firstname   VARCHAR(255) NOT NULL,
      lastname    VARCHAR(255) NOT NULL,
      email       VARCHAR(255) UNIQUE NOT NULL,
      imageurl    TEXT DEFAULT 'https://as2.ftcdn.net/v2/jpg/00/73/69/47/500_F_73694724_7n3f29wiCflslPQiVFKWOVlMCh76wkHu.jpg',
      username    VARCHAR(255) UNIQUE NOT NULL,
      password    VARCHAR(255) NOT NULL,
      isadmin     BOOLEAN DEFAULT false
      );

    CREATE TABLE orders(
      id          SERIAL PRIMARY KEY,
      status      VARCHAR(255) DEFAULT 'created',
      userid      INTEGER REFERENCES users(id),
      created     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );

    CREATE TABLE order_products(
      id          SERIAL PRIMARY KEY,
      productid   INTEGER REFERENCES products(id),
      orderid     INTEGER REFERENCES orders(id),
      price       MONEY NOT NULL,
      quantity    INTEGER NOT NULL DEFAULT (0)
      );
    
    CREATE TABLE reviews(
      id          SERIAL PRIMARY KEY,
      userid      INTEGER REFERENCES users(id) NOT NULL,
      productid   INTEGER REFERENCES products(id) NOT NULL,
      rating      INTEGER NOT NULL DEFAULT (0), 
      review      TEXT NOT NULL,
      created     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
    `);
    console.log("TABLES BUILT");
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("CREATING USERS");
    const users = await Promise.all(seedUsers.map((user) => createUser(user)));
    console.log("USERS CREATED", users);
    console.log("FINISHED CREATING USERS");
  } catch (error) {
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("CREATING PRODUCTS");
    const products = await Promise.all(
      seedProducts.map((product) => createProduct(product))
    );
    console.log("Products created:", products);
    console.log("FINISHED CREATING PRODUCTS");
  } catch (error) {
    throw error;
  }
}

async function createInitialOrders() {
  console.log("Starting to create orders...");
  try {
    console.log("CREATING ORDERS");
    const orders = await Promise.all(
      seedOrders.map((order) => createOrder(order))
    );
    console.log("Orders created", orders);
    console.log("FINISHED CREATING ORDERS");
  } catch (error) {
    throw error;
  }
}

async function createInitialOrderProducts() {
  try {
    console.log("CREATING ORDER PRODUCTS");
    const orderProducts = await Promise.all(
      seedOrderProducts.map((orderProduct) => createOrderProduct(orderProduct))
    );
    console.log("These are the order products", orderProducts);
    console.log("FINISHED CREATING ORDER PRODUCTS");
  } catch (error) {
    throw error;
  }
}

/*
async function createInitialReviews() {
  try {
    console.log("CREATING REVIEWS");
    const reviews = await Promise.all(
      seedReviews.map((newReview) => {
        createReview(newReview);
      })
    );
    console.log("THESE ARE THE REVIEWS", reviews);
    console.log("FINISHED CREATING REVIEWS");
  } catch (error) {
    throw error;
  }
}*/

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderProducts();
    //await createInitialReviews();
  } catch (error) {
    console.error("Error during rebuild DB");
  }
}

module.exports = {
  rebuildDB,
};
