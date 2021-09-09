const express = require("express");
const productsRouter = express.Router();

const { requireAdmin, requireUserOrAdmin } = require("./utils");
const {
  getAllProducts,
  getProductById,
  createProduct,
  destroyProduct,
  updateProduct,
  getOrdersByProduct,
} = require("../db");

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

// requires admin!
productsRouter.post("/products", requireAdmin, async (req, res, next) => {
  try {
    const newProduct = await createProduct({ ...req.body });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

//require admin!
productsRouter.delete(
  "/products/:productId",
  requireAdmin,
  async (req, res, next) => {
    const { productId: id } = req.params;
    try {
      const product = await getProductById(id);
      if (product) {
        await destroyProduct(id);
        res.send(product);
      } else if (!product) {
        next({
          name: "ProductNotFoundError",
          message: "That product does not exist",
        });
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "You must be an admin to delete a product",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

productsRouter.patch(
  "/products/:productId",
  requireAdmin,
  async (req, res, next) => {
    const { productId: id } = req.params;
    const { name, description, price } = req.body;

    try {
      const productToUpdate = await getProductById(id);
      if (productToUpdate === undefined) {
        next({
          name: "ProductNotFound",
          message: `No product found using id #${id}`,
        });
      } else {
        const updatedProduct = await updateProduct({
          id,
          name,
          description,
          price,
        });
        if (updatedProduct !== undefined) {
          res.send(updatedProduct);
        } else {
          next({ name: "FailedToUpdate", message: "Could not update product" });
        }
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// requires admin!
productsRouter.get("/products/:productId/orders", requireAdmin, async (req, res, next) => {
  const { productId: id } = req.params;
  try {
    const products = await getOrdersByProduct({ id });
    res.send(products);
  } catch ({name, message}) {
    next({name, message})
  }
})

module.exports = productsRouter;
