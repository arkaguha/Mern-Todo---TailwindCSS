import { useState } from "react";
import { useCallback } from "react";

export default function AddEditTodo() {
  const [formData, setFormData] = useState({
    todo_title: "",
    todo_description: "",
    completion_status: false,
  });
  const handleUserInput = useCallback((e) => {
    let { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData);
  }, []);
  const handleSave = () => {};
  return (
    <div>
      <form onSubmit={handleSave}>
        <input
          type="checkbox"
          value=""
          checked={formData.completion_status}
          onChange={handleUserInput}
        />
        <input
          type="text"
          name="todo_title"
          value={formData.todo_title}
          placeholder="Title"
          onChange={handleUserInput}
          id=""
        />
        <input
          type="textarea"
          name="todo_description"
          value={formData.todo_description}
          onChange={handleUserInput}
          placeholder="Description"
          id=""
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
