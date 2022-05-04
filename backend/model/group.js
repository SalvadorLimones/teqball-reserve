const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: [{ id: String, role: String }],
  events: [
    { name: String, venue: String, date: Date, participants: [{ id: String }] },
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
