// database methods

// export
module.exports = {
  // db methods
  ...require("./client"),
  ...require("./users"),
  ...require("./products"),
  ...require("./users"),
  ...require("./orders"),
  ...require("./order_products"),
};