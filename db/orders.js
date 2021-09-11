const client = require("./client");

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE id=$1;
        `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
            SELECT orders.*, users.username AS "username"
            FROM orders
            JOIN users ON orders."userId" = users.id;
        `);

    const { rows: joinedProducts } = await client.query(`
      SELECT products.*, "productId", order_products.id as "orderProductId"
      FROM order_products
      INNER JOIN products
      ON "productId" = products.id;
    `);

    const ordersWithProducts = orders.map((order) => {
      order.products = joinedProducts.filter(
        (product) => product.orderId === order.id
      );
      return order;
    });
    return ordersWithProducts;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUser({ username }) {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT orders.*, users.username AS "username"
            FROM orders
            JOIN users ON orders."userId" = users.id
            WHERE username=$1;
        `,
      [username]
    );

    const { rows: joinedProducts } = await client.query(`
            SELECT products.*, "orderId", order_products.id as "orderProductId"
            FROM order_products
            INNER JOIN products
            ON "productId" = products.id;
        `);

    const ordersWithProducts = orders.map((order) => {
      order.products = joinedProducts.filter(
        (product) => product.orderId === order.id
      );
      return order;
    });
    return ordersWithProducts;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByProduct({ id }) {
  try {
    const { rows: orders } = await client.query(`
      SELECT orders.*, users.username AS "username"
      FROM orders
      JOIN users ON orders."userId" = users.id;
    `);
    const { rows: joinedProducts } = await client.query(
      `
      SELECT products.*, "orderId", order_products.id as "orderProductId"
      FROM order_products
      INNER JOIN products
      ON "productId" = products.id;
    `,
      [id]
    );

    const ordersWithProducts = orders.map((order) => {
      order.products = joinedProducts.filter(
        (product) => product.orderId === order.id
      );
      return order;
    });

    return ordersWithProducts;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser({ id }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      SELECT order.*, orders."userId"
      FROM orders
      JOIN users ON orders."userId" = users.id
      WHERE status = created;
    `,
      [id]
    );

    const { rows: joinedProducts } = await client.query(`
    SELECT products.*, "orderId", order_products.id as "orderProductId"
    FROM order_products
    INNER JOIN products
    ON "productId" = products.id;
    `);

    const ordersWithProducts = cart.map((order) => {
      order.products = joinedProducts.filter(
        (product) => product.orderId === order.id
      );
      return order;
    });
    return ordersWithProducts;
  } catch (error) {
    throw error;
  }
}

async function createOrder({ status, userId }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders("status", "userId")
      VALUES ($1, $2)
      RETURNING *;
    `,
      [status, userId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
};
