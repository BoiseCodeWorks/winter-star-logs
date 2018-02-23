var router = require("express").Router();
var Comments = require("../models/comment");

// GET ALL COMMENTS
router.get("/api/comments", (req, res, next) => {
  Comments.find(req.query)
    .then(comments => {
      return res.send(comments);
    })
    .catch(next);
});

// GET A COMMENT BY ID
router.get("/api/comments/:id", (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      return res.send(comment);
    })
    .catch(next);
});

// CREATE A COMMENT
router.post("/api/comments", (req, res, next) => {
  Comments.create(req.body)
    .then(comment => {
      return res.send(comment);
    })
    .catch(next);
});

// UPDATE A COMMENT
router.put("/api/comments/:id", (req, res, next) => {
  Comments.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(comment => {
      return res.send(comment);
    })
    .catch(next);
});


// DESTROY A COMMENT
router.delete("/api/comments/:id", (req, res, next) => {
  Comments.findByIdAndRemove(req.params.id)
    .then(comment => {
      return res.send("Comment successfully deleted!");
    })
    .catch(next);
});

module.exports = { router };
