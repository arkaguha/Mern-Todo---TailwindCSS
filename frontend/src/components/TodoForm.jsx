import axios from "axios";
import { useState } from "react";
import useAuth from "../contexts/UseAuth";
import { useLoader } from "../contexts/UseLoader";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function TodoForm({ getTodos }) {
  // Form state for title, description, and completion
  const [formData, setFormData] = useState({
    todos_title: "",
    todos_description: "",
    completion_status: false,
  });

  // Form visibility toggle
  const [formVisible, setFormVisible] = useState(false);

  // Loader from context
  const { showLoader, hideLoader } = useLoader();

  // Auth from context
  const { user, token } = useAuth();

  // Handle input changes
  const handleFormData = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Toggle form visibility
  const toggleForm = () => setFormVisible((prev) => !prev);

  // Submit new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoader();

      // Include userId only when sending to server
      const todoToSend = {
        ...formData,
        userId: user.id,
      };
      // console.log("todotosend 48 tofo: ", todoToSend);

      try {
        const res = await axios.post(`${SERVER_URL}/new/todo`, todoToSend, {
          headers: { authorization: `Bearer ${token}` },
        });
        console.log(res.data.message);
      } catch (error) {
        console.log("error 54 t0fo: ", error.message);
      }
      // console.log("New todo response:", res.data);

      // Reset form after submission
      setFormData({
        todos_title: "",
        todos_description: "",
        completion_status: false,
      });

      setFormVisible(false); // hide form

      // Refresh todos list in parent
      getTodos();
    } catch (error) {
      console.error("Error submitting todo:", error);
    } finally {
      hideLoader();
    }
  };

  return (
    <section className="">
      {/* Toggle form */}
      <button
        id="add"
        type="button"
        onClick={toggleForm}
        className="fixed px-4 py-2 mt-0 right-0 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 transition"
      >
        {formVisible ? "Cancel" : "ADD ➕"}
      </button>

      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="mt-20 fixed bg-white opacity-98 rounded-2xl m-4 p-4 border flex flex-col w-[90%] items-center justify-center"
        >
          <input
            className="border border-gray-300 rounded-lg mx-4 mb-4 px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400  w-[80%] "
            name="todos_title"
            value={formData.todos_title}
            onChange={handleFormData}
            placeholder="Title"
            required
          />

          <textarea
            className="w-[80%] h-[90%] border border-gray-300 rounded-lg mx-4 mb-4 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            name="todos_description"
            value={formData.todos_description}
            onChange={handleFormData}
            placeholder="Description"
          />
          <div className="col-span-4 flex flex-col items-center space-y-2">
            <label>
              <input
                type="checkbox"
                name="completion_status"
                checked={formData.completion_status}
                onChange={handleFormData}
              />
              &nbsp; Done
            </label>

            <button
              type="submit"
              className="w-20 mt-2 px-3 py-1 rounded-md text-sm font-medium  text-white hover:bg-blue-600 transition bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
