const mongoose = require("mongoose");

module.exports = mongoose.model(
  "USER",
  mongoose.Schema(
    {
      name: { required: true, type: String },
      email: { required: true, type: String, unique: true },
      password: { required: true, type: String },
    },
    { collection: "Users" }
  )
);
