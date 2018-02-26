var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var schemaName = "Ship";

var schema = new Schema({
  name: { type: String, required: true },
  type: { type: String },
  origin: { type: String },
  inService: { type: Boolean },
  logs: [],
  creatorId: { type: ObjectId, ref: "User" }
});

module.exports = mongoose.model(schemaName, schema);
