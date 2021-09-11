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

async function createOrderProduct({ productid, orderid, price, quantity }) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
      INSERT INTO order_products(productid, orderid, price, quantity)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `,
      [productid, orderid, price, quantity]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}


async function addProductToOrder({ orderId, productId, price, quantity }) {
  try {
    const {
      rows: [prevOrderProduct],
    } = await client.query(
      `
      SELECT * 
      FROM order_products
      WHERE "orderId" = $1 and "productId" = $2;
    `,
      [orderId, productId]
    );
    console.log(prevOrderProduct);
    const { quantity: prevQuantity, price: prevPrice } = prevOrderProduct;
    if (orderProduct) {
      const {
        rows: [orderProduct],
      } = await client.query(
        `
        UPDATE order_products SET price = $1, quantity = $2, (price, quantity)
        WHERE "orderId" = $3 and "productId" = $4
        RETURNING *;
      `,
        [price + prevPrice, quantity + prevQuantity]
      );
      return orderProduct;
    } else {
      const {
        rows: [orderProduct],
      } = await client.query(
        `
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
        [orderId, productId, price, quantity]
      );
      return orderProduct;
    }
  } catch (error) {
    throw error;
  }
}


async function updateOrderProduct({ id, price, quantity }) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
    UPDATE order_products(price, quantity)
    SET price = $1, quantity = $2
    WHERE id = $3
    RETURNING *;
  `,
      [price, quantity, id]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

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
  createOrderProduct,
  destroyOrderProduct,
};
