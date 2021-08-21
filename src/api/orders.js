const express = require("express");
const ordersRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// If a route has a (*) next to it, it means that it should require a logged in user to be present,
// if a route has a (**) next to it, the logged in user should be the owner of the modified object.
// If a route has (*admin) next to it, the logged in user must be an admin user (user.isAdmin === true).
// Any (**) route should also be accessible by any (*admin) user.

const { requireUserOrAdmin, requireAdmin } = require("./utils");

ordersRouter.use((req, res, next) => {
  console.log("A request is being made to /orders");
  next();
});

const { getAllOrders, getCartByUser } = require("../db");

//THIS SHOULD RETURN A LIST OF ALL ORDERS
//NEEDS requireAdmin FROM /UTILS
ordersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//THIS SHOULD RETURN A USER'S CART
//NEEDS requireUser FROM /UTILS
ordersRouter.get("/cart", requireUserOrAdmin, async (req, res, next) => {
  try {
    const cart = await getCartByUser(req.user.id);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

//THIS SHOULD CREATE A NEW ORDER
ordersRouter.post("/", requireUserOrAdmin, async (req, res, next) => {
  const { status, userId } = req.body;
  try {
    const userOrder = await createOrder({ status, userId });
    res.send(userOrder);
  } catch (error) {
    next(error);
  }
});
