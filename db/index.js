const ordersRouter = require("../routes/orders");

// export
module.exports = {
    ...require("./client"),
    ...require("./users"),
    ...require("./products"),
    ...require("./users"),
    ...require("./orders"),
    ...require("./order_products")
}
