const client = require("./client");

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT *
            FROM products
            WHERE id=$1;
        `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM products;
        `);
    console.log("These are the products from DB:", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createProduct({
  name,
  artist,
  description,
  price,
  imageurl,
  instock,
  category,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products (name, artist, description, price, imageurl, instock, category)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `,
      [name, artist, description, price, imageurl, instock, category]
    );
    return product;
  } catch (error) {
    console.error(error);
  }
}

// needs eyes on it to make sure when status is completed it won't be deleted
async function destroyProduct({ id }) {
  try {
    if (status) {
      const {
        rows: [product],
      } = await client.query(
        `
      DELETE FROM products
      WHERE id=$1
      RETURNING *
    `,
        [id]
      );

      await client.query(
        `
      DELETE FROM order_products
      WHERE "productId"=$1;
    `,
        [id]
      );
    }
  } catch (error) {
    console.error(error);
  }
}

//needs eyes on it before being pushed
async function updateProduct({ id, name, description, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      UPDATE products
      SET name = $1, desciption = $2, price = $3
      WHERE id = ${id}
      RETURNING *;
    `,
      [name, description, price]
    );
    return product;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  destroyProduct,
  updateProduct,
};
