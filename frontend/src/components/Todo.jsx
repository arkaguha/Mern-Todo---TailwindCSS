import { useState } from "react";
import axios from "axios";
import useAuth from "../contexts/UseAuth";
import { useLoader } from "../contexts/UseLoader";
import { useTheme } from "../contexts/ThemeContext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Todo({ todos, getTodos }) {
  const { token } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const { theme } = useTheme();
  // Track which todo is currently being edited
  const [editTodoId, setEditTodoId] = useState(null);

  // Local form state for editing title + description
  const [formData, setFormData] = useState({
    todos_title: "",
    todos_description: "",
  });

  // Toggle edit mode + prefill form fields
  function toggleEdit(todo) {
    if (editTodoId === todo._id) {
      // Cancel editing
      setEditTodoId(null);
      setFormData({ todos_title: "", todos_description: "" });
    } else {
      // Enable editing and prefill values
      setEditTodoId(todo._id);
      setFormData({
        todos_title: todo.todos_title || "",
        todos_description: todo.todos_description || "",
      });
    }
  }

  // Handle changes in input fields
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Save edited title + description
  async function handleSave(e, todoId) {
    e.preventDefault();
    try {
      showLoader();
      const res = await axios.put(
        `${SERVER_URL}/edit/todo/${todoId}`,
        formData, // only send title & description
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log("Todo updated:", res.data.message);
      setEditTodoId(null);
      setFormData({ todos_title: "", todos_description: "" });
      getTodos(); // refresh the todos list
    } catch (err) {
      console.error("Error updating todo:", err);
    } finally {
      hideLoader();
    }
  }

  // Toggle completion status separately
  async function handleToggleCompletion(todoId, checked) {
    try {
      showLoader();
      await axios.put(
        `${SERVER_URL}/set/todo/${todoId}`,
        { completion_status: checked },
        { headers: { authorization: `Bearer ${token}` } }
      );
      getTodos();
    } catch (err) {
      console.error("Error updating completion:", err);
    } finally {
      hideLoader();
    }
  }
  const handleDeleteTodo = async (id) => {
    try {
      showLoader();
      const response = await axios.delete(`${SERVER_URL}/del/todo/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log("84 todo response :", response.data);
      getTodos();
    } catch (error) {
      console.log("85 todo error: ", error);
    } finally {
      hideLoader();
    }
  };

  return (
    <section
      className={
        theme === "dark"
          ? "bg-teal-400 min-h-screen p-6 mt-20 lg:grid lg:grid-cols-2 gap-3 text-black"
          : "bg-teal-100 min-h-screen p-6 mt-20 lg:grid lg:grid-cols-2 gap-3 "
      }
    >
      {todos.length === 0 ? (
        <div className="text-center text-gray-700">
          <p className="text-lg font-medium">
            No todos found! <br /> Create now ...
          </p>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="mb-4">
            <form
              className={
                theme === "dark"
                  ? "grid grid-cols-10 items-start gap-4 bg-gray-700 text-amber-100 rounded-xl shadow-md p-4"
                  : "grid grid-cols-10 items-start gap-4 bg-white rounded-xl shadow-md p-4"
              }
              onSubmit={(e) => handleSave(e, todo._id)}
            >
              {/* Title + Description (70%) */}
              <div className="col-span-8 flex flex-col space-y-3">
                <input
                  className={` border border-gray-300 rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                    todo.completion_status ? "line-through" : ""
                  } `}
                  name="todos_title"
                  disabled={editTodoId !== todo._id}
                  value={
                    editTodoId === todo._id
                      ? formData.todos_title
                      : todo.todos_title
                  }
                  onChange={handleChange}
                  placeholder="Enter title"
                />

                <textarea
                  className={` border border-gray-300 rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                    todo.completion_status ? "line-through" : ""
                  } `}
                  name="todos_description"
                  disabled={editTodoId !== todo._id}
                  value={
                    editTodoId === todo._id
                      ? formData.todos_description
                      : todo.todos_description
                  }
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              {/* Actions (30%) */}
              <div className="col-span-2 flex flex-col items-center space-y-2">
                {/* Completion checkbox */}
                <label
                  className={
                    theme === "dark"
                      ? "flex items-center gap-2 text-sm text-white"
                      : "flex items-center gap-2 text-sm text-gray-700"
                  }
                >
                  <input
                    type="checkbox"
                    checked={todo.completion_status}
                    onChange={(e) =>
                      handleToggleCompletion(todo._id, e.target.checked)
                    }
                    className="w-4 h-4 accent-teal-500"
                  />
                  Done
                </label>

                {/* Edit / Cancel + Save */}
                <button
                  type="button"
                  onClick={() => toggleEdit(todo)}
                  className="w-full px-3 py-1 rounded-md text-sm font-medium  text-white hover:bg-blue-600 transition bg-blue-500"
                >
                  {editTodoId === todo._id ? "Cancel" : "Edit"}
                </button>

                {editTodoId === todo._id && (
                  <button
                    type="submit"
                    className="w-full px-3 py-1 rounded-md text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                )}

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="w-full px-3 py-1 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </form>
          </div>
        ))
      )}
    </section>
  );
}
