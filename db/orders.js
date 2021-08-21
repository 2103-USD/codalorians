const client = require("./client");

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(`
            SELECT *
            FROM orders
            WHERE id=id;
        `), [id];
    return order;
  } catch (error) {
    throw error;
  }
}

// still needs work : Base off of routines DB
async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
        `);
  } catch (error) {
    throw error;
  }
}

// may need to look into chance users.username AS "userName"
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

async function getOrdersByProduct({}) {}

async function getCartByUser({}) {}

async function createOrder({}) {}
