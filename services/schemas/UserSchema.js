const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  nume: { type: String, required: [true], minLength: 2 },
  varsta: { type: Number, required: [true], min: 1 },
  anNastere: { type: Number, required: [true], min: 1 },
  oras: { type: String, required: [true], minLength: 2 },
  cetatenie: { type: String, required: [true], minLength: 2 },
  major: { type: Boolean, required: [true] },
});

const User = mongoose.model("users", user);

module.exports = User;
