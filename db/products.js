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

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createProduct({
  name,
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
            INSERT INTO products (name, description, price, imageurl, instock, category)
            VALUES ($1, $2, $3, $4, $5, $6);
        `,
      [name, description, price, imageurl, instock, category]
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
};
