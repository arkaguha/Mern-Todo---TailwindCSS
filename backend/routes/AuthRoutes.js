const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthControllers");

module.exports = router
  .post("/register", AuthController.postRegister)
  .post("/login", AuthController.postLogin);
