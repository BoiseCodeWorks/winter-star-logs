var router = require("express").Router();
var Ships = require("../models/ship");
var Logs = require("../models/log");
var Comments = require("../models/comment");

// GET ALL SHIPS
router.get("/api/ships", (req, res, next) => {
  Ships.find(req.query)
    .then(ships => {
      return res.send(ships);
    })
    .catch(next);
});

// GET A SHIP BY ID
router.get("/api/ships/:id", (req, res, next) => {
  Ships.findById(req.params.id)
    .then(ship => {
      return res.send(ship);
    })
    .catch(next);
});

// GET LOGS BY SHIPID
router.get("/api/ships/:id/logs", (req, res, next) => {
  Ships.findById(req.params.id)
    .then(ship => {
      Logs.find({ shipId: req.params.id })
        .then(logs => {
          ship.logs = logs;
          return res.send(ship);
        })
        .catch(next);
    })
    .catch(next);
});

// GET Comments by LogId
router.get("/api/ships/:shipId/logs/:logId/comments", (req, res, next) => {
  Comments.find({ logId: req.params.logId })
    .then(comments => {
      return res.send(comments);
    })
    .catch(next);
});

// CREATE A SHIP
router.post("/api/ships", (req, res, next) => {
  req.body.creatorId = req.session.uid;

  Ships.create(req.body)
    .then(ship => {
      return res.send(ship);
    })
    .catch(next);
});

// UPDATE A SHIP
router.put("/api/ships/:id", (req, res, next) => {
  Ships.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(ship => {
      return res.send(ship);
    })
    .catch(next);
});

// OR
// router.put("/api/ships/:id", (req, res, next) => {
// Ships.findById(req.params.id).then(ship => {
//   if (ship) {
//     for (var key in req.body) {
//       if (ship[key] && key != "_id" && key != "author") {
//         ship[key] = req.body[key];
//       }
//     }
//     ship.update(ship)
//       .then(() => {
//         return res.send(ship);
//       })
//   }
// });
// });

// DESTROY A SHIP
router.delete("/api/ships/:id", (req, res, next) => {
  Ships.findByIdAndRemove(req.params.id)
    .then(ship => {
      return res.send("Ship successfully deleted!");
    })
    .catch(next);
});

module.exports = { router };
