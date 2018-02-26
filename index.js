var express = require("express");
var bp = require("body-parser");
var cors = require("cors");
var server = express();
require("./server-assets/db/mlab-config");
var port = 3000;
var authRoutes = require("./server-assets/auth/routes");
var shipRoutes = require("./server-assets/routes/ships");
var logRoutes = require("./server-assets/routes/logs");
var commentRoutes = require("./server-assets/routes/comments");

server.use(cors());
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));

server.use(authRoutes);

server.use(shipRoutes.router);
server.use(logRoutes.router);
server.use(commentRoutes.router);

server.use("*", (err, req, res, next) => {
  res.status(400).send(err);
});

server.listen(port, () => {
  console.log("Server running on port: ", port);
});
