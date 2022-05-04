const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  members: [{ member_id: String, member_name: String, role: String }],
  events: [
    { name: String, venue: String, date: Date, participants: [{ id: String }] },
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
