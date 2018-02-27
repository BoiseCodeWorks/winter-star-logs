var express = require("express");
var bp = require("body-parser");
var cors = require("cors");
var server = express();
require("./server-assets/db/mlab-config");
var port = 3000;
var session = require("./server-assets/auth/session");
var authRoutes = require("./server-assets/auth/routes");
var shipRoutes = require("./server-assets/routes/ships");
var logRoutes = require("./server-assets/routes/logs");
var commentRoutes = require("./server-assets/routes/comments");


var whitelist = ['http://localhost:8080'];
var corsOptions = {
	origin: function (origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true
};


server.use(cors(corsOptions));
server.use(session);
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));

server.use(authRoutes);

server.use("/api/*", (req, res, next) => {
  if (req.method.toLowerCase() != "get" && !req.session.uid) {
    return res.status(401).send({ error: "PLEASE LOGIN TO CONTINUE" });
  }

  next();
});

server.use(shipRoutes.router);
server.use(logRoutes.router);
server.use(commentRoutes.router);

server.use("*", (err, req, res, next) => {
  res.status(400).send(err);
});

server.listen(port, () => {
  console.log("Server running on port: ", port);
});
