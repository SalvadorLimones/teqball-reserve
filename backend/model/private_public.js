const mongoose = require("mongoose");

const privatePublicSchema = new mongoose.Schema({
  private: String,
  public: String,
});

const PrivatePublic = mongoose.model("PrivatePublic", privatePublicSchema);

module.exports = PrivatePublic;
