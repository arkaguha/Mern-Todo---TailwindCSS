const axios = require("axios");
const TODO = require("../models/Todo");
const mongoose = require("mongoose");

exports.getHome = async (req, res) => {
  try {
    const response = await axios.get(
      "http://www.omdbapi.com/?i=tt3896198&apikey=77a46cf1"
      //   `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`
    );
    res.json(response.data); // ✅ send response.data (not entire axios object)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTodos = async (req, res) => {
  const user = req.user;
  // console.log("68ba9887747e951990b95eb1: ", user); //id: 68ba9887747e951990b95eb1

  const todos = await TODO.find({
    userId: new mongoose.Types.ObjectId(user.id),
  });
  // console.log("todos: ", todos);

  res.json(todos);
};
exports.postNewTodos = async (req, res) => {
  const { todos_title, todos_description, completion_status, userId } =
    req.body;
  // console.log("30 toC0 : ", {
  //   todos_title,
  //   todos_description,
  //   completion_status,
  //   userId,
  // });

  if (!todos_title || !todos_description) {
    return res
      .status(400)
      .json({ error: "Todo title and description are required." });
  }

  if (req.user.id === userId) {
    try {
      const todo = new TODO({
        todos_title,
        todos_description,
        completion_status,
        userId,
      });
      await todo.save();
      res.status(201).json({ message: "Task saved successfully", todo });
    } catch (error) {
      // console.log("error 45 todoCon: ", error);
      res.status(500).json({ error: "Failed to save task." });
    }
  } else {
    res.status(403).json({ error: "Unauthorized user." });
  }
};

// Edit title & description
exports.editTodos = async (req, res) => {
  try {
    const { todos_title, todos_description } = req.body;
    const todoId = req.params.id;

    // console.log(
    //   "req.body edit 61",
    //   { todos_title, todos_description, todoId },
    //   req.user.id
    // );

    // Validate required fields
    if (!todos_title || !todos_description) {
      return res
        .status(400)
        .json({ error: "Todo title and description are required." });
    }

    // Find the todo belonging to the user and update
    const updatedTodo = await TODO.findOneAndUpdate(
      { _id: todoId, userId: req.user.id },
      { $set: { todos_title, todos_description } },
      { new: true } // return the updated document
    );
    // console.log("UPDATED todo 80: ", updatedTodo);

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found or unauthorized." });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTodo });
  } catch (error) {
    console.error("Error editing todo:", error);
    res.status(500).json({ error: "Failed to update todo." });
  }
};

// Edit completion status separately
exports.editCompletionStatus = async (req, res) => {
  try {
    const { completion_status } = req.body;
    const todoId = req.params.id;

    // Update only the completion_status
    const updatedTodo = await TODO.findOneAndUpdate(
      { _id: todoId, userId: req.user.id },
      { completion_status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found or unauthorized." });
    }

    res.status(200).json({ message: "Completion status updated", updatedTodo });
  } catch (error) {
    console.error("Error updating completion status:", error);
    res.status(500).json({ error: "Failed to update completion status." });
  }
};
// delete
exports.deleteTodos = async (req, res) => {
  const id = req.params.id;
  const todoId = req.params.id;
  try {
    const delStatus = await TODO.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (delStatus) {
      return res.status(200).json({ message: "Todo deleted !" });
    }
  } catch (error) {
    console.error("Error delete todo 137: ", error);
    res.status(500).json({ error: "Failed to delete todo ..." });
  }
};
