const express = require("express");
const routinesRouter = require("../../UNIV_FitnessTrackr_Starter/api/routines");
const productsRouter = express.Router();

const { getAllProducts, getProductById } = require("../db");

productsRouter.get("/products", async (req, res, next) => {
  const products = await getAllProducts();

  res.send(products);
});

routinesRouter.get("/product/:productId", async (req, res, next) => {
  const product = await getProductById(id);

  res.send(product);
});

module.exports = productsRouter;
