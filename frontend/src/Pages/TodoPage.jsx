import Navbar from "../components/Navbar";
import axios from "axios";
import useAuth from "../contexts/UseAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/UseLoader";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";

export default function TodoPage() {
  const { user, token } = useAuth();
  const [todos, setTodos] = useState([]);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const getTodos = async () => {
    try {
      showLoader();
      const res = await axios.get(`${SERVER_URL}/todos`, {
        headers: { authorization: `Bearer ${token}` },
      });
      // console.log("Todos response data:", res.data);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      hideLoader();
    }
  };

  // console.log(todos);

  useEffect(() => {
    if (!token) return navigate("/login");
    getTodos();
  }, []);

  return (
    <section className="w-screen h-screen">
      <Navbar user={user} />
      <TodoForm getTodos={getTodos} />
      <Todo todos={todos} getTodos={getTodos} />
    </section>
  );
}
