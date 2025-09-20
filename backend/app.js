const express = require("express");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

require("dotenv").config();
const USER = require("./models/User");
const cors = require("cors");
const AuthRoutes = require("./routes/AuthRoutes");
const TodoRoutes = require("./routes/TodoRoutes");
app.use(express.json());
app.use(cors());

// Register route
app.use(AuthRoutes);
app.use(TodoRoutes);
// Login route

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
});
