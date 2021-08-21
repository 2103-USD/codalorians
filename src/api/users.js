const express = require("express");
const usersRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { requireUser, requireAdmin } = require("./utils");

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
    next();
});

//THIS SHOULD GET ORDERS FOR A SPECIFIC USER
// if a route has a (**) next to it, the logged in user should be the owner of the modified object.
usersRouter.get("/:userId/orders", requireUser, async (req, res, next) => {
    // consider middleware to check for userId === logged in user
        try {
            if (userId === req.user.id) {
            const userOrders = await getOrdersByUser({ userId });
            res.send(userOrders);
            } else {
                next({
                name: "ViewCurrentUserCart",
                message: "You can only view your cart"
                })
            }
        } catch (error) {
            next(error)
        }
    })