var expressSession = require("express-session");
var mongoStore = require("connect-mongodb-session")(expressSession);

var store = new mongoStore({
  uri: "mongodb://test:test@ds062448.mlab.com:62448/test-db",
  collection: "Sessions"
});

store.on("error", function(err) {
  console.log("[SESSION ERROR]", err);
});

// @ts-ignore
var session = expressSession({
  secret: "wh0000000 lives in a pineapple under the SKY!!!",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2,
  },
  store,
  resave: true,
  saveUninitialized: true
});

module.exports = session;
