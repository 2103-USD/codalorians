const client = require("./client");

async function getOrderProductById(id) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
            SELECT *
            FROM order_products
            WHERE id=$1;
        `,
      [id]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

//still needs work before this function is completed
async function addProductToOrder({ orderId, routineId, price, quantity }) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
        INSERT INTO order_products("orderId", "routineId", price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
      [orderId, routineId, price, quantity]
    );

    return orderProduct;
  } catch (error) {
    throw error;
  }
}

//needs work prior to completion
async function updateOrderProduct() {}

async function destroyOrderProduct(id) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
            DELETE FROM order_products
            WHERE id=$1
            RETURNING *;
        `,
      [id]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOrderProductById,
  addProductToOrder,
  updateOrderProduct,
  destroyOrderProduct,
};
