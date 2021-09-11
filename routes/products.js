const express = require("express");
const productsRouter = express.Router();

const { getAllProducts, getProductById } = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next({ name: "ErrorMsg", message: `${error}` });
  }
});

productsRouter.get("/product/:productId", async (req, res, next) => {
  try {
    const product = await getProductById(id);
    res.send(product);
  } catch (error) {
    next({ name: "ErrorMsg", message: `${error}` });
  }
});

module.exports = productsRouter ;
