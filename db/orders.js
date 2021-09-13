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

// may need to look into change users.username AS "userName"
async function getAllOrders() {
  try {
    const {
      rows: [orders],
    } = await client.query(`
            SELECT orders.*, users.username AS "username"
            FROM orders
            JOIN users ON orders."userId" = users.id;
        `);

    const {
      rows: [joinedProducts],
    } = await client.query(`
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
    const {
      rows: [orders],
    } = await client.query(
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

// may need to look into change users.username AS "userName"
async function getOrdersByProduct({ id }) {
  try {
    const {
      rows: [orders],
    } = await client.query(`
      SELECT orders.*, users.username AS "username"
      FROM orders
      JOIN users ON orders."userId" = users.id;
    `);
    const {
      rows: [joinedProducts],
    } = await client.query(
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

// Last function to complete
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

    const {
      rows: [joinedProducts],
    } = await client.query(`
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

async function createOrder({ status, userid }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders("status", "userid")
      VALUES ($1, $2)
      RETURNING *;
    `,
      [status, userid]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrder( fields = {}) {
  const { id } = fields;
  const setString = Object.keys(fields)
    .map ((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    if (setString.length === 0 ) {
      return "";
    }

  try { 
    const {
      rows: [updatedOrder],
    } = await client.query(`
      UPDATE routines
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
    Object.values(fields)
    );
  } catch (error) {
    console.error(error);
  }
}

async function completeOrder({id}) {
  try {
    const { rows: [order] } = await client.query(`
    UPDATE orders
    SET status="completed"
    WHERE id=$1
    RETURNING *;
    `, [id]);
    return order
  } catch (error) {
      console.error(error)
  }
}

async function cancelOrder({id}) {
  try {
    const { rows: [order] } = await client.query(`
      UPDATE orders
      SET status="cancelled"
      WHERE id=$1
      RETURNING *;
    `, [id]);
  } catch (error) {
      console.error(error)
  }
}

module.exports = {
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  createOrder,
  completeOrder,
  cancelOrder,
  updateOrder,
};
