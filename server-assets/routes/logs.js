var router = require("express").Router();
var Logs = require("../models/log");

// GET ALL LOGS
router.get("/api/logs", (req, res, next) => {
  Logs.find(req.query)
    .then(logs => {
      return res.send(logs);
    })
    .catch(next);
});

// GET A LOG BY ID
router.get("/api/logs/:id", (req, res, next) => {
  Logs.findById(req.params.id)
    .then(log => {
      return res.send(log);
    })
    .catch(next);
});

// CREATE A LOG
router.post("/api/logs", (req, res, next) => {
  Logs.create(req.body)
    .then(log => {
      return res.send(log);
    })
    .catch(next);
});

// UPDATE A LOG
router.put("/api/logs/:id", (req, res, next) => {
  Logs.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(log => {
      return res.send(log);
    })
    .catch(next);
});


// DESTROY A LOG
router.delete("/api/logs/:id", (req, res, next) => {
  Logs.findByIdAndRemove(req.params.id)
    .then(log => {
      return res.send("Log successfully deleted!");
    })
    .catch(next);
});

module.exports = { router };
