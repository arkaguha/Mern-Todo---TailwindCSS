const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/TodoController");
const authToken = require("../middlewares/authToken");

module.exports = router
  .get("/app/home", authToken, TodoController.getHome)
  .get("/todos", authToken, TodoController.getTodos)
  .post("/new/todo", authToken, TodoController.postNewTodos)
  .put("/edit/todo/:id", authToken, TodoController.editTodos) // title & description
  .put("/set/todo/:id", authToken, TodoController.editCompletionStatus) // completion only
  .delete("/del/todo/:id", authToken, TodoController.deleteTodos); // delete
