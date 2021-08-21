const express = require("express");
const routinesRouter = require("../../UNIV_FitnessTrackr_Starter/api/routines");
const productsRouter = express.Router();

const { getAllProducts, getProductById } = require("../db");

productsRouter.get("/products", async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.send(products);
  } catch (error) {
    next(error);
  }
});

routinesRouter.get("/product/:productId", async (req, res, next) => {
  try {
    const product = await getProductById(id);

    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
