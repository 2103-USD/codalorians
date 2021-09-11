// This is the Web Server
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const apiRouter = require("./routes");
const client = require("./db/client");



server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, "build")));
server.use("/api", apiRouter);

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.get("*", (req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "No route found for the requested URL",
  });
});

server.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);
  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!", error);
  }
});
