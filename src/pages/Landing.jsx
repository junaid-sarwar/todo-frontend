import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">Welcome to Todo App</h1>
        <p className="text-xl mb-8">Manage your tasks efficiently and effortlessly.</p>
        <Link
          to="/sign-up"
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-semibold transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;
