var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var schemaName = "User";
const SALT_FACTOR = 13;

var roles = ["public", "moderator", "admin"];

var schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  created: { type: Number, default: Date.now(), required: true },
  bio: { type: String },
  role: { type: String, enum: roles }
});

schema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR));
};

schema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.changeRole = function(newRole, uid) {
  if (roles.indexOf(newRole) <= roles.indexOf(this.user.role)) {
    this.user.role = newRole;
    this.save();
  }
};

module.exports = mongoose.model(schemaName, schema);
