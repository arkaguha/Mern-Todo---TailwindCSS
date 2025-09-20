const jwt = require("jsonwebtoken");

const USER = require("../models/User");

exports.postRegister = async (req, res) => {
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
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await USER.findOne({ email, password });
    // console.log("appjs: ", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password!" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // expires in 15 minutes
    );

    res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
