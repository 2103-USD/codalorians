const { client } = require("./client");

async function getProductById(id) {
    try {
        const { rows: [product] } = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1
        `, [id]);
    } catch (error) {
        throw error;
    }
}

async function getAllProducts() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM products
        `)

        return rows;
    } catch (error) {
        throw error;
    }
}

async function createProduct(product) {
    const {name, description, price, inStock, imageURL, category } = product;
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, price, inStock, imageURL, category)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [name, description, price, inStock, imageURL, category]);

        return product;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getProductById,
    getAllProducts,
    createProduct
}

