const express = require("express");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const USER = require("./models/User");
const authToken = require("./middlewares/authToken");
const axios = require("axios");
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await USER.findOne({ email }, { new: true });

    if (user) {
      return res.status(400).json({ message: "User already registered!" });
    }

    const newUser = new USER({ name, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await USER.findOne({ email, password });
    // console.log("appjs: ", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // expires in 15 minutes
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/app/home", authToken, async (req, res) => {
  try {
    const response = await axios.get(
      "http://www.omdbapi.com/?i=tt3896198&apikey=77a46cf1"
      //   `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`
    );
    res.json(response.data); // ✅ send response.data (not entire axios object)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
