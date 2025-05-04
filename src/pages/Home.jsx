// pages/Home.jsx
import { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchTodos();
    } else {
      window.location.href = "/login"; // Redirect to login if no token
    }
  }, [priorityFilter]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllTodo?priority=${priorityFilter}`);
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const handleCreateTodo = async (todo) => {
    try {
      await axios.post(`${API_URL}/createTodo`, todo);
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 font-sans">
      <h1 className="text-5xl font-bold text-center mb-8 text-white drop-shadow-lg tracking-wide">Todo App</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
      >
        Logout
      </button>
      <TodoForm onCreateTodo={handleCreateTodo} />
      <div className="mb-6 text-center">
        <label htmlFor="priority" className="mr-3 text-lg font-medium">Filter:</label>
        <select
          id="priority"
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="extreme">Extreme</option>
        </select>
      </div>
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
};

export default Home;
