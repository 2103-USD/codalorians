const express = require("express");
const ordersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { requireUser, requireAdmin } = require("./utils");

const {
  getAllOrders,
  getCartByUser,
  updateOrderProduct,
  destroyOrderProduct,
} = require("../db");

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
ordersRouter.get("/cart", requireUser, async (req, res, next) => {
  try {
    const cart = await getCartByUser(req.user.id);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

//THIS SHOULD CREATE A NEW ORDER
ordersRouter.post("/", requireUser, async (req, res, next) => {
  const { status, userId } = req.body;
  try {
    const userOrder = await createOrder({ status, userId });
    res.send(userOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { id, status, userId } = req.body;
    const updatedOrder = await updateOrder({ id, orderId, userId, status });
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { id, status, userId } = req.body;
    const deletedOrder = await destroyOrderProduct({
      id,
      orderId,
      userId,
      status,
    });
    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
