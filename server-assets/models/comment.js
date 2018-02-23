var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var schemaName = "Comment";

var schema = new Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  body: { type: String, required: true },
  logId: { type: ObjectId, ref: "Log", required: true },
  shipId: { type: ObjectId, ref: "Ship", required: true}
});

module.exports = mongoose.model(schemaName, schema);
