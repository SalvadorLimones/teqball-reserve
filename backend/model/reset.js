const mongoose = require("mongoose");

const resetSchema = new mongoose.Schema({
  code: { type: String, unique: true },
});

const Reset = mongoose.model("reset", resetSchema);

module.exports = Reset;
