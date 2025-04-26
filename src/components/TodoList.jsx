import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getPriorityColor = (priority) => {
  if (priority === "extreme") return "text-red-400";
  if (priority === "medium") return "text-yellow-400";
  return "text-green-400";
};

const TodoList = ({ todos, fetchTodos }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteTodo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/updateTodo/${id}`, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo", error);
    }
  };

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditText(title);
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/updateTodo/${id}`, { title: editText });
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error saving edit", error);
    }
  };

  return (
    <div className="space-y-6">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="bg-gray-800/80 p-5 rounded-xl shadow-xl flex items-center justify-between hover:scale-[1.02] hover:bg-gray-700/70 transition-all duration-300"
        >
          <div
            onClick={() => handleToggleComplete(todo._id, todo.completed)}
            className={`cursor-pointer flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
          >
            {editingId === todo._id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="bg-transparent border-b border-gray-500 text-white focus:outline-none w-full"
              />
            ) : (
              <span className="text-xl font-medium">{todo.title}</span>
            )}
            <div className={`text-sm mt-2 font-semibold ${getPriorityColor(todo.priority)}`}>
              Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </div>
          </div>

          <div className="ml-6 flex gap-3">
            {editingId === todo._id ? (
              <button
                onClick={() => handleSaveEdit(todo._id)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(todo._id, todo.title)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(todo._id)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
