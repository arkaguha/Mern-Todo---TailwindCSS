const mongoose = require("mongoose");

module.exports = mongoose.model(
  "TODO",
  mongoose.Schema(
    {
      todos_title: { type: String, required: true },
      todos_description: { type: String },
      completion_status: { type: Boolean, default: false },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
      },
    },
    { collection: "UserTodos" }
  )
);
