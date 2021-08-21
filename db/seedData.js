const client = require("./client");
const { createProduct } = require("./products");
const { createUser } = require("./users");

async function dropTables() {
  try {
    console.log("DROPPING TABLES");
    // drop tables in correct order
    await client.query(`
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
    // build tables in correct order
    console.log("CREATING TABLES");
    await client.query(`
    CREATE TABLE products (
      id           SERIAL PRIMARY KEY,
      name         VARCHAR(255) NOT NULL,
      description  VARCHAR(255) NOT NULL,
      price        INTEGER NOT NULL,
      imageurl     TEXT DEFAULT 'https://image.flaticon.com/icons/png/512/2827/2827585.png',
      instock      BOOLEAN NOT NULL DEFAULT false,
      category     VARCHAR(255) NOT NULL,
      );

    CREATE TABLE users (
      id          SERIAL PRIMARY KEY,
      firstname   VARCHAR(255) NOT NULL,
      lastname    VARCHAR(255) NOT NULL,
      email       VARCHAR(255) UNIQUE NOT NULL,
      imageurl    TEXT DEFAULT 'https://as2.ftcdn.net/v2/jpg/00/73/69/47/500_F_73694724_7n3f29wiCflslPQiVFKWOVlMCh76wkHu.jpg',
      username    VARCHAR(255) UNIQUE NOT NULL,
      password    VARCHAR(255) UNIQUE NOT NULL,
      isadmin     BOOLEAN NOT NULL DEFAULT false,
      );

    CREATE TABLE orders (
      id          SERIAL PRIMARY KEY,
      status      VARCHAR(255) DEFAULT 'created',
      userid      INTEGER REFERENCES users(id),
      dateplaced  DATE DEFAULT sysdate NOT NULL,
      );

    CREATE TABLE order_products (
      id          SERIAL PRIMARY KEY,
      productid   INTEGER REFERENCES products(id),
      orderid     INTEGER REFERENCES orders(id),
      price       INTEGER NOT NULL,
      quantity    INTEGER NOT NULL DEFAULT (0),
      );
    `);
    console.log("TABLES BUILT");
  } catch (Error) {
    console.error(Error);
  }
}

async function createInitialUsers() {
  try {
    console.log("CREATING USERS");
    const usersToCreate = [
      {
        firstname: "Alex",
        lastname: "Yambao",
        email: "alex.yambao@someemail.com",
        imageurl:
          "https://as2.ftcdn.net/v2/jpg/00/73/69/47/500_F_73694724_7n3f29wiCflslPQiVFKWOVlMCh76wkHu.jpg",
        username: "ayambao",
        password: "abc123",
        isAdmin: true,
      },
      {
        firstname: "Enzi",
        lastname: "Schow",
        email: "enzi.schow@someemail.com",
        imageurl:
          "https://as2.ftcdn.net/v2/jpg/00/73/69/47/500_F_73694724_7n3f29wiCflslPQiVFKWOVlMCh76wkHu.jpg",
        username: "eschow",
        password: "abc123",
        isAdmin: true,
      },
      {
        firstname: "Anthony",
        lastname: "Fernan",
        email: "anthony.fernan@someemail.com",
        imageurl:
          "https://as2.ftcdn.net/v2/jpg/00/73/69/47/500_F_73694724_7n3f29wiCflslPQiVFKWOVlMCh76wkHu.jpg",
        username: "afernan",
        password: "abc123",
        isAdmin: true,
      },
    ];
    const users = await Promise.all(
      usersToCreate.map((user) => createUser(user))
    );
    console.log("USERS CREATED", users);
    console.log("FINISHED CREATING USERS");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialProducts() {
  try {
    console.log("CREATING PRODUCTS");
    const productsToCreate = [
      {
        name: `Sony - 65" Class BRAVIA XR X90J Series LED 4K UHD Smart Google TV`,
        description:
          "4X the pixels of Full HD. Found on most modern TVs. Lifelike images and graphics. Great for living rooms, family rooms, larger bedrooms.",
        price: "1,349.99",
        imageurl:
          "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6453/6453208_sd.jpg;maxHeight=640;maxWidth=550",
        instock: true,
        category: "Electronics",
      },
      {
        name: `Sony - 55'" Class BRAVIA XR X90J Series LED 4K UHD Smart Google TV`,
        description:
          "Everything you watch becomes more detailed and immersive with true-to-life 4K HDR, powered by the all-new Cognitive Processor XR™. Feel the intensity of the sun and experience all the stars of the night sky with Full Array LED and XR Contrast Booster 5. With outstanding picture quality, a flush bezel design, and HDMI 2.1 for next-gen gaming, the X90J 4K HDR LED TV is ready for everything.",
        price: "1,199.99",
        imageurl:
          "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6453/6453205_sd.jpg;maxHeight=640;maxWidth=550",
        instock: true,
        category: "Electronics",
      },
    ];
    const products = await Promise.all(
      productsToCreate.map((product) => createProduct(product))
    );
    console.log("Products created:", products);
    console.log("Finished creating products");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialOrders() {
  try {
  } catch (error) {}
}

async function createInitialOrderProducts() {
  try {
  } catch (error) {}
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
  } catch (Error) {
    console.error("Error during rebuild DB");
    throw Error;
  }
}

module.exports = {
  rebuildDB,
};
