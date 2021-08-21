const express = require("express");
const orderProductsRouter = express.Router();
const {
  getOrderProductById,
  getOrdersByProducts,
  updateOrderProduct,
  addProductToOrder,
} = "./db";

//POST /orders/:orderId/products
ordersProductsRouter.post(
  "/orders/:orderId/products",
  async (req, res, next) => {
    const { orderId } = req.params;
    try {
      const { id, price, instock } = await getOrderProductById(id);
      const quantity = 1;
      const orderProducts = await getOrdersByProducts(orderId);
      if (
        orderProducts.find(
          (orderproducts) => product.id === orderproducts.id
        ) &&
        instock
      ) {
        const updatedOrder = await updateOrderProduct({
          orderId,
          price,
          quantity,
        });
        return updatedOrder;
      }
      const addProduct = await addProductToOrder({
        orderId,
        id,
        price,
        quantity,
      });
      return addProduct;
    } catch (error) {
      console.error(error);
    }
  }
);

//PATCH /order_products/:orderProductId
ordersProductsRouter.patch(
  "/order_products/:orderProductId",
  async (req, res, next) => {
    const { quantity, price } = req.body;
    const { orderProductId } = req.params;
    try {
      const updateOrder = await updateOrderProduct({
        orderProductId,
        quantity,
        price,
      });
      res.send(updateOrder);
    } catch (error) {
      console.error(error);
    }
  }
);

//DELETE /order_products/:orderProductId (**)
ordersProductsRouter.delete(
  "/order_products/:orderProductId",
  requireUser,
  async (req, res, next) => {
    const { id } = req.user;
    const { orderProductId } = req.params;
    try {
      const order = await getOrderProductById(orderProductId);
      if (id !== order.userid) {
        next({ name: "NotAMatch", message: "User ID does not match" });
      }
      const destroyOrderProduct = await destroyOrderProduct(orderProductId);
      res.send(destroyOrderProduct);
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = orderProductsRouter;
