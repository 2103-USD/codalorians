const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersProductsRouter = require("./order_products");
const stripeRouter = require("./stripe");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/order_products", ordersProductsRouter);
apiRouter.use("/stripe", stripeRouter);

apiRouter.use((error, res) => {
  res.send(error);
});

module.exports = apiRouter ;
