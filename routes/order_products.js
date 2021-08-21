const express = require("express");
const orderProductsRouter = express.Router();

//POST /orders/:orderId/products
ordersProductsRouter.post("/orders/:orderId/products", async(req, res, next) => {
    const {orderId} = req.params
    try {
    //grab productId from current order
    const {}
    if (productId === products.id) {
    //increase product qty. price 
    }
    const addSingleProduct = await func(product)
    res.send(addSingleProduct)
    } catch(error) {
     console.error(error)
    }
})

//PATCH /order_products/:orderProductId
ordersProductsRouter.patch("/order_products/:orderProductId", async (req, res, next) => {
    const { quantity, price } = req.body
    const { orderProductId } = req.params
    try {
    const updateOrderProduct = await func({orderProductId, quantity, price})
    res.send(updateOrderProduct);
    } catch(error) {
        console.error(error)
    }
})

//DELETE /order_products/:orderProductId (**)
ordersProductsRouter.delete("/order_products/:orderProductId", requireUser, async (req, res, next) => {
    const {id} = req.user 
    const {orderProductId} = req.params;
    try {
    const order = await getOrderByUserId(id)
    if (id !== order.userId) {
    next({name:"NotAMatch" , message: "User ID does not match"})
    }
    const deleteOrderProduct = await deleteOrderProductFromOrder(orderProductId)
    res.send(deleteOrderProduct)
    } catch({name,message}) {
    next({name, message})
    }
})

module.exports = orderProductsRouter