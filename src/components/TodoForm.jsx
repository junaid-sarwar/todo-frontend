import { useState } from 'react';

const TodoForm = ({ onCreateTodo }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      title,
      completed: false,
      priority,
    };

    onCreateTodo(newTodo);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Add Todo"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="normal">Normal</option>
        <option value="medium">Medium</option>
        <option value="extreme">Extreme</option>
      </select>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white font-semibold transition shadow-md hover:shadow-green-400/50"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
