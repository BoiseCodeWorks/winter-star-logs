var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var schemaName = "Log";

var schema = new Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  title: { type: String, required: true },
  body: { type: String, required: true },
  shipId: { type: ObjectId, ref: "Ship", required: true }
});

module.exports = mongoose.model(schemaName, schema);
